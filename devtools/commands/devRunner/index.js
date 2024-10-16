const http = require('http');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const httpProxy = require('http-proxy');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const clearConsole = require('react-dev-utils/clearConsole');
const printBuildError = require('react-dev-utils/printBuildError');
const rimraf = require('rimraf');
const webpack = require('webpack');
const loadEnvConfig = require('../../env');
const webpackConfigs = require('../../webpack');
const { rootDirname } = require('../../webpack/variables');
const ServerRunner = require('./ServerRunner');

// resolve the path to get the entrypoint for the server once built
const serverEntry = path.resolve('./build/server.js');

// is it running in an interactive shell
const isInteractive = process.stdout.isTTY;

class MainRunner {
    constructor() {
        // create runner
        this.serverRunner = new ServerRunner();

        // list runners
        this.runners = [this.serverRunner];

        // initialize latest run ID
        this.latestRun = 0;

        // empty build directory
        rimraf.sync(path.join(rootDirname, 'build'));

        // start a multi-compiler
        this.compiler = webpack(webpackConfigs);

        // isolate the two compilers
        this.serverCompiler = this.compiler.compilers.find(instance => instance.name === 'server');

        // port on which the app is running
        this.port = null;

        // load environment
        loadEnvConfig(rootDirname, true);
    }

    async start() {
        await this.startWebServer();

        // watch the server compiler
        this.serverCompiler.watch({}, this.onUpdates.bind(this));
    }

    async onUpdates(error, stats) {
        this.latestRun += 1;
        const activeRun = this.latestRun;

        const isOutdated = () => activeRun !== this.latestRun;

        if (isOutdated()) {
            return;
        }

        if (isInteractive) {
            clearConsole();
        }

        if (error) {
            printBuildError(error);
        }

        if (!error && !stats.hasErrors()) {
            try {
                // we cannot apply the update so we will reload the whole server
                // but first delete the node cache
                delete require.cache[serverEntry];

                // stop runners
                for (const runner of this.runners) {
                    // eslint-disable-next-line no-await-in-loop
                    await runner.stop();

                    if (isOutdated()) {
                        // this run is outdated
                        return;
                    }
                }

                // now we can get the latest version of our server
                // eslint-disable-next-line global-require, import/no-unresolved, import/no-dynamic-require
                const bundle = require(serverEntry);

                // start runners
                for (const runner of this.runners) {
                    // eslint-disable-next-line no-await-in-loop
                    await runner.start(bundle, isOutdated);

                    if (isOutdated()) {
                        // this run is outdated
                        return;
                    }
                }

                console.warn(chalk.cyan(`Server is listening on ${this.port}`));
            } catch (runtimeError) {
                // print the error
                console.error(runtimeError);
            }
        }
    }

    async startWebServer() {
        this.port = await choosePort('0.0.0.0', 3000);

        // create an express server to serve the application as a whole
        const app = express();

        // create a proxy but do not define a target yet
        const proxy = httpProxy.createProxyServer({ xfwd: true });

        // print error when there's any
        proxy.on('error', () => {
            // simply ignore the error
            // as it's not critical to us
        });

        app.use(async (req, res, next) => {
            try {
                proxy.web(req, res, { target: await this.serverRunner.getUrl() });
            } catch (error) {
                next(error);
            }
        });

        // create the http server
        const httpServer = http.createServer(app);

        httpServer.on('upgrade', async (req, socket, head) => {
            try {
                proxy.ws(req, socket, head, { target: await this.serverRunner.getUrl() });
            } catch (error) {
                // do nothing about it
            }
        });

        httpServer.listen(this.port);

        // Listen for uncaught exceptions - these are errors that are thrown outside the
        // context of the Express.js controllers and other proper async request handling.
        process.on('uncaughtException', function handleError(error) {
            console.log(chalk.red.bold('Uncaught Exception'));
            console.error(error);
        });
    }
}

module.exports = MainRunner;
