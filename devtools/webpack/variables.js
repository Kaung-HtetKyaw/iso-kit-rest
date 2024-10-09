const path = require('path');

const isBuildIntentDevelopment = process.env.NODE_ENV === 'development';
const isBuildIntentProduction = !isBuildIntentDevelopment;
const isBuildTargetIntentProduction = isBuildIntentProduction && process.env.BUILD_TARGET === 'production';

const rootDirname = path.resolve(__dirname, '../..');
const srcDirname = path.join(rootDirname, './src');

const webpackMode = isBuildIntentProduction ? 'production' : 'development';

module.exports = {
    isBuildIntentDevelopment,
    isBuildIntentProduction,
    isBuildTargetIntentProduction,
    rootDirname,
    srcDirname,
    webpackMode,
};
