import config from '../core/config';
import getRedisInstance from '../core/redis';
import { mainQueue, QueueMessage } from './mainQueue';
import { QueueHandler, QueuePeriodicPlans } from './QueueHandler';

export let queues = [] as QueueHandler[];

export const setup = () => {
    const mainQueueJobs: QueuePeriodicPlans<QueueMessage>[] = [];

    if (config.healthChecks.logWorkerBeat && config.healthChecks.workerBeat) {
        mainQueueJobs.push({
            message: { type: 'workerBeat', message: {} },
            repeat: { every: 10000 },
            jobId: 'workerBeat',
        });
    }

    mainQueue.setupWorker({
        workerOpts: {
            connection: getRedisInstance(),
            concurrency: 5,
            removeOnComplete: { count: 1000 },
            removeOnFail: { count: 5000 },
        },
        plans: mainQueueJobs,
    });

    queues.push(mainQueue);

    return async () => {
        await mainQueue.pauseQueue();
    };
};

export const pauseAllQueues = () => Promise.all(Object.values(queues).map(el => el.pauseQueue()));
