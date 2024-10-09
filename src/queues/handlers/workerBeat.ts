import { Document } from 'bson';
import { Job } from 'bullmq';
import fetch from 'node-fetch';
import queryString from 'query-string';
import config from '../../core/config';
import { runHealthChecks } from '../../core/health';
import * as Sentry from '@sentry/node';

export type WorkerBeatMessage = {};

export const workerBeatHandler = async (message: WorkerBeatMessage, job: Job<Document>) => {
    if (!config.healthChecks.workerBeat) {
        // there's no beat to call
        return;
    }

    const args = queryString.stringify({ msg: 'OK ' });

    try {
        // do health check first
        await runHealthChecks();
        // then call the beat
        await fetch(`http://localhost:${config.port}${config.healthChecks.workerBeat}?${args}`);
    } catch (error) {
        // print the error and log with Sentry
        console.error(error);
        Sentry.captureException(error);
    }
};
