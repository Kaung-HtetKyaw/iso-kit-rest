import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Integration } from '@sentry/types';
import { Express } from 'express';

import config from './config';
import chalk from 'chalk';

const { sentry: sentryConfig } = config;

export const initializeSentry = ({ app }: { app?: Express } = {}) => {
    if (!sentryConfig.dsn) {
        console.error(chalk.yellow('Cannot find sentry dsn to intilize'));
        return;
    }

    const integrations: Integration[] = [new RewriteFrames()];

    const sentryInitOptions: Sentry.NodeOptions = {
        release: sentryConfig.release,
        dsn: sentryConfig.dsn,
        environment: sentryConfig.environment,
        maxValueLength: Infinity,
    };

    if (sentryConfig.tracing) {
        sentryInitOptions.tracesSampleRate = sentryConfig.tracesSampleRate;

        if (app) {
            integrations.push(new Tracing.Integrations.Express({ app }));
        }
    }

    // @ts-ignore
    sentryInitOptions.integrations = integrations;

    Sentry.init(sentryInitOptions);
};
