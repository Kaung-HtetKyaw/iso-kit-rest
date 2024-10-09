import { MongoClient, Db } from 'mongodb';
import services from '../services';
import { StringStore, NumberStore } from '../../core/env';
import { getRegularOptions } from '../../database/client';

export class DatabaseClientManager {
    private readonly instances: MongoClient[];

    constructor() {
        this.instances = [];
    }

    register(instance: MongoClient): void {
        this.instances.push(instance);
    }

    unregister(instance: MongoClient): void {
        this.instances.splice(this.instances.indexOf(instance), 1);
    }

    async closeAll(): Promise<void> {
        const promises = this.instances.map(async client => {
            try {
                // close the connection
                await client.close();
            } finally {
                // and remove the client from instances
                this.unregister(client);
            }
        });

        await Promise.all(promises);
    }
}

export const initializeClient = async (
    connectionString: string,
    pool: number,
    databaseClientManager?: DatabaseClientManager
): Promise<MongoClient> => {
    // otherwise we need to create it
    const client = new MongoClient(connectionString, { minPoolSize: pool, ...getRegularOptions() });

    if (databaseClientManager) {
        // persist it
        databaseClientManager.register(client);
    }

    // wait for the client to connect
    await client.connect();

    return client;
};

export interface Config {
    SERVICES_CONNECTION_STRING: StringStore;
    SERVICES_CONNECTION_POOL: NumberStore;
    SERVICES_DATABASE: StringStore;
    MIGRATION_CONNECTION_STRING: string;
    MIGRATION_DATABASE: string;
}

export const getServiceDatabase = async (
    service: string,
    databaseClientManager: DatabaseClientManager,
    config: Config
): Promise<Db> => {
    // get the connection string from configuration for the service given
    const connectionString = config.SERVICES_CONNECTION_STRING[service];

    // identity the pool size for this service
    const poolSize = config.SERVICES_CONNECTION_POOL[service];

    // initialize the database client
    const client = await initializeClient(connectionString, poolSize, databaseClientManager);

    return client.db(config.SERVICES_DATABASE[service]);
};

export const getAllDatabases = async (
    databaseClientManager: DatabaseClientManager,
    config: Config
): Promise<{ [service: string]: Db }> => {
    const promises = Object.keys(services).map(async service => [
        service,
        await getServiceDatabase(service, databaseClientManager, config),
    ]);

    const entries = await Promise.all(promises);

    return Object.fromEntries(entries);
};

export const getMigrationDatabase = async (
    databaseClientManager: DatabaseClientManager,
    config: Config
): Promise<Db> => {
    // set undefined for pool size because it does not matter for migrations
    const client = await initializeClient(config.MIGRATION_CONNECTION_STRING, undefined, databaseClientManager);

    return client.db(config.MIGRATION_DATABASE);
};
