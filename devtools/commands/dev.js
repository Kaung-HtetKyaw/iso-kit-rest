if (process.env.NODE_ENV !== 'test') {
    process.env.NODE_ENV = 'development';
}

const MainRunner = require('./devRunner');

const runner = new MainRunner();

runner.start();
