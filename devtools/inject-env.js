const { spawn } = require('child_process');
const path = require('path');
const loadEnvConfig = require('./env');
const pkg = require('../package.json');
const fs = require('fs');
const pm2Config = require('../ecosystem.config');
const { format } = require('prettier');

let newPkg = { ...pkg };
let scripts = { ...newPkg.scripts };
let newPm2Config = { ...pm2Config };

const injectEnvsToPm2 = parsedResults => {
    const apps = newPm2Config.apps.map(app => {
        return {
            ...app,
            env_local: { ...app.env_local, ...parsedResults },
            env_development: { ...app.env_development, ...parsedResults },
            env_production: { ...app.env_production, ...parsedResults },
        };
    });

    const content = format(`module.exports = ${JSON.stringify({ ...newPm2Config, apps })}`);

    fs.writeFileSync(path.resolve(__dirname, '../ecosystem.config.js'), content, () => {
        console.log('Successfully added production ecosystem config');
    });
};

const inject = () => {
    const { parsedResults } = loadEnvConfig(path.resolve(__dirname, '../'));

    const envs = Object.entries(parsedResults)
        .map(el => {
            const [key, value] = el;

            return `${key}=${value}`;
        })
        .join(' ');

    injectEnvsToPm2(parsedResults);

    scripts = {
        ...scripts,
        ['start']: `NODE_ENV=production ${envs} ${scripts['prepare-start']}`,
    };

    const content = format(JSON.stringify({ ...newPkg, scripts }), { parser: 'json' });

    fs.writeFileSync(path.resolve(__dirname, '../package.json'), content, () => {
        console.log('Successfully added production start script');
    });
};

inject();
