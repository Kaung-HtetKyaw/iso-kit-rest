import { MongoClient, Db } from 'mongodb';
import config from '../core/config';
import { getRegularClient, getEncryptedClient } from './client';
import { Collections, getCollections } from './collections';
import getKMS from './kms';
import { createServices, DatabaseClientManager, Operations } from '../data-operations';
import { Sequelize } from 'sequelize';
import { getIntegratedDbClient } from '../integrated-database/instance';
import createIntegratedServices from '../integrated-database/data-operations/createServices';
import { Operations as IntegratedOperations } from '../integrated-database/data-operations/services';

export type DatabaseContext = {
    regular: { client: MongoClient; db: Db };
    encrypted: { client: MongoClient; db: Db };
    integrated: { client: Sequelize };
    SequelizeClass: Sequelize;
    collections: Collections;
    operations: OperationsContext;
    integratedOperations: IntegratedOperations;
};

export type OperationsContext = {
    regular: Partial<Operations>;
    integrated: Partial<IntegratedOperations>;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

if (!global.db) {
    // update the global store
    global.db = { context: null, promise: null };
}

let cached: DatabaseContext = null;

export const getDatabaseContext = async (databaseClientManager: DatabaseClientManager): Promise<DatabaseContext> => {
    if (cached && global.db.context) {
        return cached;
    }

    if (!global.db.promise) {
        const init = async (): Promise<Pick<DatabaseContext, 'regular' | 'encrypted' | 'integrated'>> => {
            // get regular client first
            const regularClient = await getRegularClient();
            const regularDb = regularClient.db(config.db.name);

            // get encrypted client
            const kms = getKMS();
            const encryptedClient = kms ? await getEncryptedClient(kms) : regularClient;
            const encryptedDb = encryptedClient.db(config.db.name);

            const integratedClient = await getIntegratedDbClient();

            return {
                regular: { client: regularClient, db: regularDb },
                encrypted: { client: encryptedClient, db: encryptedDb },
                integrated: { client: integratedClient },
            };
        };

        // get the promise
        global.db.promise = init();
    }

    // wait for it
    // and assigned it globally
    global.db.context = await global.db.promise;

    const [collections, operations] = await createServices(databaseClientManager);

    const [_, integratedOperations] = await createIntegratedServices(global.db.context.integrated.client);

    // update the cache
    cached = {
        ...global.db.context,
        collections,
        operations: {
            regular: operations,
            integrated: integratedOperations,
        },
    };

    // finally return the cache
    return cached;
};
