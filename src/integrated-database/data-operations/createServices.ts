import { Sequelize } from 'sequelize';
import * as envConfig from './utils/config';
import services, { Models, Operations } from './services';
import { getModels } from './getModels';

const createIntegratedServices = async (
    dbClient: Sequelize,
    config: typeof envConfig = envConfig,
    verbose: boolean = false
): Promise<[Partial<Models>, Partial<Operations>]> => {
    // list of collections and operations across all services
    let models: Partial<Models> = {};
    let operations: Partial<Operations> = {};

    await Promise.all(
        config.SERVICES.map(async serviceName => {
            const buildService = services[serviceName];

            if (!buildService) {
                // this service does not exist
                throw new Error(`Service "${serviceName}" does not exist.`);
            }

            // get models from database
            const dbModels = await getModels({ integrated: { client: dbClient } });

            // build the service
            const service = buildService(dbModels);

            // merge collections and operations
            models = { ...models, ...service.models };
            operations = { ...operations, ...service.operations };

            if (verbose) {
                // print it for verbose/debug purposes
                console.info(`Service "${serviceName}" registered.`);
            }
        })
    );

    return [models, operations];
};

export default createIntegratedServices;
