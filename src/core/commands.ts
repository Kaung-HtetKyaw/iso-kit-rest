import chalk from 'chalk';
import config from './config';
import createWebServer from './createWebServer';
import { initializeSentry } from './sentry';
import { setup as startWorker } from '../queues/setup';
import { HealthStatus, HealthStatusManager } from './health';
import { getDatabaseContext } from '../database/instance';
import { migrate } from '../database/migrate';
import { DatabaseClientManager } from '../data-operations';

export const composeCommand = (...shutdowns: (() => Promise<unknown>)[]) => {
    const onExit = () => {
        Promise.all(shutdowns.map(shutdown => shutdown())).then(() => process.exit(0));
    };

    process.on('SIGTERM', onExit);
    process.on('SIGINT', onExit);
};

export const executeDataMigration = async (exitOnTermination = false): Promise<void> => {
    const databaseClientManager = new DatabaseClientManager();

    // get the database connection
    const context = await getDatabaseContext(databaseClientManager);

    try {
        // then migrate the database
        await migrate(context);
    } catch (error) {
        // print it
        console.error(error);

        if (exitOnTermination) {
            // and exit on status 1
            process.exit(1);
        }

        // throw it back
        throw error;
    }

    console.info(chalk.greenBright('Migration completed'));

    if (exitOnTermination) {
        // and properly exit
        process.exit(0);
    }
};

export const startWorkerCommand = (manager: HealthStatusManager) => {
    initializeSentry();

    // start workers
    const stopWorker = startWorker();
    // update status
    manager.update(HealthStatus.Running);

    let stopPromise: Promise<unknown> | null = null;

    return () => {
        // update status
        manager.update(HealthStatus.Stopping);

        if (!stopPromise) {
            stopPromise = stopWorker()
                .then(() => {
                    manager.update(HealthStatus.Stopped);
                })
                .catch(error => {
                    console.error(error);
                    process.exit(1);
                });
        }

        return stopPromise;
    };
};

export const startServer = async () => {
    const databaseClientManager = new DatabaseClientManager();

    const { httpServer, expressServer } = await createWebServer(databaseClientManager);

    return { httpServer, expressServer };
};

export const startServerCommand = async () => {
    const databaseClientManager = new DatabaseClientManager();

    const { httpServer, expressServer } = await createWebServer(databaseClientManager);

    initializeSentry({ app: expressServer });

    httpServer.listen(config.port, () => {
        console.info(chalk.cyan(`${config.name} is listening on port: `), config.port);
    });

    return () => {
        return new Promise(resolve => {
            setTimeout(() => {
                httpServer.close(resolve);
            }, 1000);
        });
    };
};
