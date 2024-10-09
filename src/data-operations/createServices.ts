import services, { Operations, Collections } from './services';
import * as envConfig from './utils/config';
import { DatabaseClientManager, getServiceDatabase } from './utils/database';

const createServices = async (
    databaseClientManager: DatabaseClientManager,
    config: typeof envConfig = envConfig,
    verbose: boolean = false
): Promise<[Partial<Collections>, Partial<Operations>]> => {
    // list of collections and operations across all services
    let collections: Partial<Collections> = {};
    let operations: Partial<Operations> = {};

    await Promise.all(
        config.SERVICES.map(async serviceName => {
            const buildService = services[serviceName];

            if (!buildService) {
                // this service does not exist
                throw new Error(`Service "${serviceName}" does not exist.`);
            }

            // get the database for this service
            const db = await getServiceDatabase(serviceName, databaseClientManager, config);

            // build the service
            const service = buildService(db);

            // merge collections and operations
            collections = { ...collections, ...service.collections };
            operations = { ...operations, ...service.operations };

            if (verbose) {
                // print it for verbose/debug purposes
                console.info(`Service "${serviceName}" registered.`);
            }
        })
    );

    return [collections, operations];
};

export default createServices;
