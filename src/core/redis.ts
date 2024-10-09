import IORedis, { Redis } from 'ioredis';
import config from './config';
import chalk from 'chalk';

const getRedisInstance = (): Redis => {
    if (global.redis) {
        return global.redis;
    }

    global.redis = new IORedis(config.redis.uri, { enableOfflineQueue: false, maxRetriesPerRequest: null });

    return global.redis;
};

export default getRedisInstance;

export const setRedisItem = <T>(key: string, value: T) => {
    if (value === null || value === undefined) {
        return;
    }

    try {
        const redis = getRedisInstance();
        redis.set(key, JSON.stringify(value));
    } catch {
        console.info(chalk.red(`Error `), 'setting item with key: ', chalk.cyan(key));
    }
};

export const getRedisItem = async <T = string>(key: string): Promise<T | null> => {
    try {
        const redis = getRedisInstance();
        const value = await redis.get(key);
        return JSON.parse(value) as Promise<T>;
    } catch {
        return null;
    }
};

export const removeRedisItem = async (key: string) => {
    const redis = await getRedisInstance();

    await redis.del(key);
};
