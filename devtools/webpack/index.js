const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackBar = require('webpackbar');
const PackagePlugin = require('./WebpackPackagePlugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

const getBabelRule = require('./babel');

// is it running in an interactive shell
const isInteractive = process.stdout.isTTY;

const {
    webpackMode,
    srcDirname,
    rootDirname,
    isBuildIntentDevelopment,
    isBuildIntentProduction,
    isBuildTargetIntentProduction,
} = require('./variables');

const serverConfig = {
    name: 'server',
    mode: webpackMode,

    target: 'node',

    entry: {
        server: [path.resolve(srcDirname, 'node-fetch-polyfill.js'), path.resolve(srcDirname, 'index.ts')],
    },

    resolve: {
        extensions: ['.js', '.mjs', '.tsx', '.ts', '.jsx', '.json', '.wasm'],
        mainFields: ['main', 'module'],
        alias: {
            '@sentry/react': '@sentry/node',
        },
    },

    externals: ['./manifest.json', nodeExternals()],

    output: {
        path: path.resolve(rootDirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        chunkFilename: isBuildIntentDevelopment ? '[name].js' : '[name].[contenthash].js',
    },

    // do not show performance hints
    performance: false,

    bail: isBuildIntentProduction,
    devtool: isBuildIntentProduction ? 'source-map' : 'cheap-module-source-map',

    module: {
        rules: [getBabelRule(isBuildIntentDevelopment)].filter(Boolean),
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: 'process.isCLI = require.main === module;',
            entryOnly: true,
            raw: true,
        }),

        new webpack.DefinePlugin({
            'process.browser': JSON.stringify(false),
            'process.isDev': JSON.stringify(isBuildIntentDevelopment),
        }),

        isBuildTargetIntentProduction &&
            sentryWebpackPlugin({
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: process.env.SENTRY_ORG,
                project: process.env.SENTRY_PROJECT,
            }),

        // provide a package.json on production
        isBuildIntentProduction &&
            new PackagePlugin({
                yarnFile: path.resolve(rootDirname, './yarn.lock'),
            }),

        isBuildIntentProduction && isInteractive && new WebpackBar({ name: 'server', profile: true }),
    ].filter(Boolean),
};

module.exports = [serverConfig];
