import {
    composeCommand,
    executeDataMigration,
    startServer,
    startServerCommand,
    startWorkerCommand,
} from './core/commands';
import config, { runValidityChecks } from './core/config';
import createWebServer from './core/createWebServer';
import { program } from 'commander';
import { createHealthServer, HealthStatusManager } from './core/health';
import { startPrometheusServer } from './core/prometheus';
import createSuperUser from './core/createSuperUser';

runValidityChecks();

program.version(config.version);

program
    .command('migrate')
    .description('Execute data migration')
    .action(() => executeDataMigration(true));

program
    .command('worker')
    .description('Start worker')
    .action(() => {
        const manager = new HealthStatusManager();
        createHealthServer(manager);
        composeCommand(startWorkerCommand(manager));
    });

program
    .command('serve')
    .description('Start web server')
    .action(async () => {
        const manager = new HealthStatusManager();
        createHealthServer(manager);
        composeCommand(await startServerCommand(), await startPrometheusServer());
    });

// create super command
program
    .command('createSuperUser')
    .option('--email <email>', 'email address')
    .option('--username <username>', 'username')
    .option('--password <password>', 'password')
    .action(async ({ username, email, password }) => {
        try {
            if (username && email && password) {
                await createSuperUser(username, email, password);
            }
            process.exit(0);
        } catch {
            process.exit(1);
        }
    });

// @ts-ignore
if (process.isCLI) {
    program.parse();
}

export { startServer };
