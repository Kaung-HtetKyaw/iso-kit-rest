/* eslint-disable no-console */
import { Job } from 'bullmq';
import chalk from 'chalk';
import { Document } from 'bson';

export type DummyQueueMessageType = 'dummy';

export interface DummyMessage {
    value: string;
}

export const dummyHandler = async (message: DummyMessage, job: Job<Document>) => {
    console.warn(
        chalk.green(`Successfully Handled job for `, chalk.cyan('dummy')),
        'from',
        ` ${chalk.cyan(job.queueName)}`
    );
};
