/* eslint-disable @typescript-eslint/member-ordering */
import { Document, EJSON } from 'bson';
import { Job, JobsOptions, Queue, QueueOptions, Worker, WorkerOptions } from 'bullmq';
import chalk from 'chalk';
import * as Sentry from '@sentry/node';
import { getRecordTime, getTimeElapsed } from './utils';
import config from '../core/config';

export interface QueueBaseMessage {
    type: string;
    context: any;
}

export type ProcessFunction<Message> = <T extends QueueBaseMessage>(
    message: Message,
    job: Job<T>
) => Promise<void> | void;

export interface QueuePeriodicPlans<Message> {
    message: Message;
    repeat: JobsOptions['repeat'];
    jobId: string;
}

export interface QueueHandlerOptions<Message> {
    jobOptions: Omit<JobsOptions, 'repeat'>;
    queueOptions: QueueOptions | undefined;
    getLabel: (message: Message) => string;
}

export class QueueHandler<Message = any> {
    public readonly queueName;

    public readonly queue: Queue<Document>;

    public worker: Worker<any, () => void, string> | undefined;

    private readonly processFunction: ProcessFunction<Message>;

    private readonly options?: QueueHandlerOptions<Message>;

    public constructor(
        queueName: string,
        processFunction: ProcessFunction<Message>,
        options?: Partial<QueueHandlerOptions<Message>>
    ) {
        this.queueName = queueName;

        this.queue = new Queue(queueName, {
            ...this.options?.queueOptions,
        } as QueueOptions);

        this.processFunction = processFunction;

        this.options = {
            jobOptions: {
                // by default always clean up from redis
                removeOnFail: !config.bull.persistJobs,
                removeOnComplete: !config.bull.persistJobs,
                ...options?.jobOptions,
            },
            queueOptions: this.options?.queueOptions,
            getLabel: options?.getLabel || (() => this.queueName),
        };
    }

    public get token() {
        return this.queue.token;
    }

    public async isHealthy() {
        // ping redis to test it
        (await this.queue.client).ping();

        return true;
    }

    public add(name: string, data: Message, options?: JobsOptions): Promise<Job<Document>> {
        return this.queue.add(name, data as any, {
            ...this?.options?.jobOptions,
            ...options,
        });
    }

    private async handleJob(job: Job<any, any, string>) {
        const startTime = getRecordTime();

        // @ts-ignore
        let message: Message = null;
        let succeed = true;

        try {
            message = EJSON.deserialize(job.data) as Message;

            const promise = this.processFunction(message, job);

            if (promise instanceof Promise) {
                await promise;
            }
        } catch (error: any) {
            // print it for debug purposes
            console.info(chalk.red(`Failed to execute ${this.queueName}`));
            console.error(error);

            Sentry.withScope(scope => {
                if (message) {
                    scope.setExtra('message', message);
                }

                Sentry.captureException(error);
            });

            // set the job as failed
            await job.moveToFailed(error, job.token!);

            // set as errored
            succeed = false;
        } finally {
            // we may want to log it
            if (config.verbose) {
                const timeElapsed = getTimeElapsed(startTime);
                const state = succeed ? chalk.green('COMPLETED') : chalk.red('FAILED');
                const label = this?.options?.getLabel(message);
                console.info(`BULL ${label} ${state} ${timeElapsed}`);
            }
        }
    }

    public async pauseQueue() {
        await this.queue.pause();
    }

    private createWorker(options?: WorkerOptions | undefined) {
        if (this.worker) {
            return this.worker;
        }

        this.worker = new Worker(
            this.queueName,
            // @ts-ignore
            async job => {
                this.handleJob.bind(this)(job);
            },
            options
        );

        this.onJobFailed();

        return this.worker;
    }

    private onJobFailed() {
        this.worker.on('failed', (job, err) => {
            console.warn(chalk.red(`${job.id} has failed with ${err.message}`));
        });
    }

    private async setupPeriodicPlans(plans: QueuePeriodicPlans<Message>[]) {
        const jobs = await this.queue.getRepeatableJobs();

        const jobIds = plans.length
            ? await Promise.all(
                  plans.map(async plan => {
                      await this.add(
                          plan.jobId,
                          {
                              type: plan.jobId,
                              message: plan.message,
                          } as Message,
                          { repeat: plan.repeat, ...this.options.jobOptions, jobId: plan.jobId }
                      );
                      return plan.jobId;
                  })
              )
            : [];

        // remove zombies (jobs not run anymore)
        const promises = jobs
            .filter(job => !jobIds.includes(job.id))
            .map(job => this.queue.removeRepeatableByKey(job.key));

        if (promises.length) {
            await Promise.all(promises);
        }

        // print final list of repeatable jobs for debugging
        await this.printRepeatableJobs();
    }

    public async printRepeatableJobs() {
        const jobs = await this.queue.getRepeatableJobs();
        jobs.forEach(job => console.info(chalk.cyan(`Run repeatable job ${job.key} on queue ${this.queueName}`)));
    }

    public setupWorker({
        workerOpts,
        plans,
    }: {
        workerOpts: WorkerOptions | undefined;
        plans?: QueuePeriodicPlans<Message>[];
    }): QueueHandler<Message> {
        this.createWorker(workerOpts);

        if (!!plans && plans.length) {
            // set up periodic plans
            this.setupPeriodicPlans(plans);
        }

        return this;
    }

    public stop(): Promise<void> {
        return this.queue.close();
    }
}
