import * as handlers from './handlers';
import { ProcessFunction, QueueHandler } from './QueueHandler';
import getRedisInstance from './../core/redis';
import chalk from 'chalk';

export type QueueMessage =
    | { type: 'dummy'; message: handlers.DummyMessage }
    | { type: 'workerBeat'; message: handlers.WorkerBeatMessage };

const mainQueueHandler: ProcessFunction<QueueMessage> = (message, job) => {
    switch (message.type) {
        case 'dummy':
            return handlers.dummyHandler(message.message, job);

        case 'workerBeat':
            return handlers.workerBeatHandler(message.message, job);

        default:
            // @ts-ignore
            console.info(chalk.red(`Message of type `, chalk.cyan(message.type), ` is unknown to the worker`));
    }
};

export const mainQueue = new QueueHandler<QueueMessage>('main', mainQueueHandler, {
    getLabel: message => `main.${message.type}`,
    queueOptions: {
        connection: getRedisInstance(),
        defaultJobOptions: {
            attempts: 2,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
        },
    },
});
