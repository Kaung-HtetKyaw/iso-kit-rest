// create http server
import http, { Server } from 'http';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import express, { Express, Handler } from 'express';
import morgan from 'morgan';
import xhub from 'express-x-hub';
import config from './config';
import { expressRateLimiter } from './rateLimiter';
import { WebSocketServer } from 'ws';
import { setup as startWorker } from '../queues/setup';
import { getDatabaseContext } from '../database/instance';
import setupPrometheusMetrics from './prometheus';
import connectRouters from '../routers';
import { createServices, DatabaseClientManager } from '../data-operations';
import { authMiddleware } from '../middlewares/auth';
import { createSocketServer } from './createSocketServer';

export type WebServerCreation = {
    httpServer: Server;
    expressServer: Express;
};

const rateLimiterMiddleware: Handler = (req, res, next) => {
    expressRateLimiter
        .consume(req.ip, 1)
        .then(() => {
            // move on to next handler
            next();
        })
        .catch(() => {
            // reject request
            res.status(429).send('Too Many Requests');
        });
};

const disableCaching: Handler = (req, res, next) => {
    // update headers to disable caching behaviors
    res.set({
        'Cache-control': 'no-store',
        Pragma: 'no-cache',
    });

    // move on to next handler
    next();
};

const createWebServer = async (databaseClientManager: DatabaseClientManager): Promise<WebServerCreation> => {
    // create express server
    const expressServer = express();

    // disable informational headers
    expressServer.disable('x-powered-by');

    if (config.gzip) {
        // enable compression
        // we might want to disable if it's delegated to a reverse proxy
        expressServer.use(compression());
    }

    // xhub signature
    expressServer.use(xhub({ algorithm: 'sha1', secret: config.whatsapp.webhook.token }));

    // enable JSON and url encoded support
    expressServer.use(express.json());
    expressServer.use(express.urlencoded({ extended: true }));

    if (config.verbose) {
        // enable logs
        expressServer.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
    }

    // enable Sentry scope
    expressServer.use(Sentry.Handlers.requestHandler());

    // setup prometheus metrics
    await setupPrometheusMetrics(expressServer);

    if (config.sentry.tracing) {
        expressServer.use(Sentry.Handlers.tracingHandler());
    }

    // serve static files
    expressServer.use('/public', express.static('public'));

    // apply cors
    expressServer.use(
        cors((req, callback) => {
            // in production we expect the app to be served behind a reverse proxy such as the ingress controller
            // if so we rely on those information which are trust worthy as those are defined by the proxy itself
            const host = req.header('X-Forwarded-Host');
            const scheme = req.header('X-Forwarded-Scheme') || 'https';

            const origins = [`${scheme}://${host}`, ...config.allowedDomains];

            // apply cors
            callback(null, { origin: host ? origins : false, credentials: true });
        })
    );

    // then from here use rate limiter
    expressServer.use(rateLimiterMiddleware);

    // update cache policy
    expressServer.use(disableCaching);

    // create the http server
    const httpServer = http.createServer({ keepAlive: true }, expressServer);

    const { operations } = await getDatabaseContext(databaseClientManager);

    // TODO: refactor
    // start workers
    const stopWorker = await startWorker();

    const socketServerInstance = await createSocketServer({ server: httpServer, context: { operations } });

    // application middlewares
    expressServer.use([authMiddleware({ operations })]);

    connectRouters({ expressServer, operations, io: socketServerInstance });

    // sse the sentry error handler before any other error handler
    expressServer.use(Sentry.Handlers.errorHandler());

    // then here comes our error handler
    // eslint-disable-next-line no-unused-vars
    expressServer.use((error, request, response, next) => {
        // print it for logs
        console.error(error);
        // answer as 500 response
        response.status(500).send('Internal error');
    });

    // TODO: graceful shutdown for all services

    return { httpServer, expressServer };
};

export default createWebServer;
