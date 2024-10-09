/* eslint-disable no-await-in-loop */
import migrations from './migrations';
import services, { Collections } from './services';
import { MIGRATION } from './utils/collections';
import * as envConfig from './utils/config';
import { DatabaseClientManager, getAllDatabases, getMigrationDatabase } from './utils/database';

const migrate = async (
    config: typeof envConfig = envConfig,
    verbose: boolean = true,
    testsOnly: boolean = false
): Promise<void> => {
    const databaseClientManager = new DatabaseClientManager();
    // get databases
    const databases = await getAllDatabases(databaseClientManager, config);
    // get the migration database too
    const migrationDb = await getMigrationDatabase(databaseClientManager, config);
    // get the collections
    const migrationCollection = migrationDb.collection(MIGRATION);

    // get collections
    const collections = Object.entries(services).reduce((acc, [serviceName, serviceBuilder]) => {
        return {
            ...acc,
            ...serviceBuilder(databases[serviceName]).collections,
        };
    }, {}) as Collections;

    // fetch existing migrations
    const executed = (await migrationCollection.find({}).toArray()).map(({ identifier }) => identifier);

    try {
        for (const migration of migrations) {
            if (executed.includes(migration.identifier)) {
                // skip it, the migration is already applied
                continue;
            }

            if (testsOnly && migration.skipOnTests === true) {
                // do not apply this migrations on tests
                continue;
            }

            // run the migration
            await migration.up(collections);

            // persist the run
            await migrationCollection.insertOne({
                identifier: migration.identifier,
                date: new Date(),
            });

            if (verbose) {
                console.info(`${migration.identifier} executed`);
            }
        }
    } finally {
        // close database connection
        await databaseClientManager.closeAll();
    }
};

export default migrate;
