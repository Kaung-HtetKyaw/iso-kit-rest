import chalk from 'chalk';
import { getString, getBoolean, getInteger, getNumber, getPrefix, getStringList, getStringArray } from './env';
import { Dialect } from 'sequelize';
import { RETENTION_MODES } from 'minio';
import { getClientSideFieldLevelEncryptionSettings } from './encryption';

const version = getString('VERSION', '0.0.0-development');

const config = {
    version,

    // miscellaneous
    verbose: getBoolean(getPrefix('VERBOSE'), true),

    jwt: {
        integrated: {
            secret: getString(getPrefix('INTEGRATED_JWT_SECRET_KEY')),
        },
    },

    name: getString(getPrefix('NAME'), 'VORP Monitoring Server'),
    port: getNumber(getPrefix('PORT'), 3000),
    publicPath: getString(getPrefix('PUBLIC_PATH'), '/public/'),
    adminPublicPath: getString(getPrefix('ADMIN_PUBLIC_PATH'), '/public/admin/'),
    manifestFileName: getString(getPrefix('MANIFEST_FILE_NAME'), 'manifest'),
    allowedDomains: getStringArray(getPrefix('ALLOWED_DOMAINS'), []),
    socketClient: getString(getPrefix('SOCKET_CLIENT_DOMAIN')),

    // secure cookies
    cookiePolicy: getString(getPrefix('COOKIE_POLICY'), 'strict'),
    secureCookie: getBoolean(getPrefix('SECURE_COOKIE'), false),

    // health checks
    healthChecks: {
        enabled: getBoolean(getPrefix('HEALTH_ENABLED'), false),
        port: getNumber(getPrefix('HEALTH_PORT'), 4000),
        allowed: getStringList(getPrefix('HEALTH_ALLOWED'), ['::1/128', '127.0.0.0/8']),
        workerBeat: getString(getPrefix('HEALTH_WORKER_BEAT')),
        logWorkerBeat: getBoolean(getPrefix('LOG_WORKER_BEAT'), true),
    },

    // gzip module
    gzip: getBoolean(getPrefix('GZIP'), true),

    // server runtime
    db: {
        uri: getString(getPrefix('DB_URI'), 'mongodb://root:password@localhost:27017'),
        name: getString(getPrefix('DB_NAME'), 'vorp'),
        pool: getInteger(getPrefix('DB_POOL'), 10),

        username: getString(getPrefix('DB_USERNAME'), 'root'),
        password: getString(getPrefix('DB_PASSWORD'), 'password'),

        // Client Side Field Level Encryption (CSFLE)
        // https://docs.mongodb.com/drivers/security/client-side-field-level-encryption-guide/
        encryption: getClientSideFieldLevelEncryptionSettings(),

        // mongocryptd settings
        // only used if encryption is enabled
        cryptd: {
            uri: getString(getPrefix('DB_CRYPTD_URI')),
            mongocryptdBypassSpawn: getBoolean(getPrefix('DB_CRYPTD_BYPASS_SPAWN'), false),
            mongocryptdSpawnArgs: getStringList(getPrefix('DB_CRYPTD_SPWAN_ARGS'), [], ' '),
        },

        integrated: {
            name: getString(getPrefix('INTEGRATED_DB_NAME'), 'app'),
            username: getString(getPrefix('INTEGRATED_DB_USER_NAME'), 'root'),
            password: getString(getPrefix('INTEGRATED_DB_PASSWORD'), 'password'),
            host: getString(getPrefix('INTEGRATED_DB_HOST'), 'localhost'),
            dialect: getString(getPrefix('INTEGRATED_DB_DIALECT'), 'mysql') as Dialect,
            pool: getInteger(getPrefix('INTEGRATED_DB_POOL'), 10),
            port: getInteger(getPrefix('INTEGRATED_DB_PORT'), 3306),
        },
    },

    storage: {
        provider: {
            endPoint: getString(getPrefix('STORAGE_ENDPOINT')),
            accessKey: getString(getPrefix('STORAGE_ACCESS_KEY')),
            secretKey: getString(getPrefix('STORAGE_SECRET_KEY')),
            useSSL: getBoolean(getPrefix('STORAGE_SSL'), true),
            port: getInteger(getPrefix('STORAGE_PORT')),
            region: getString(getPrefix('STORAGE_REGION'), 'ap-southeast-1'),
        },
        bucket: getString(getPrefix('STORAGE_BUCKET'), 'app'),
        createBucketIfNotExists: getBoolean(getPrefix('CREATE_BUCKET_IF_NOT_EXISTS'), false),
        updateBucketPolicyOnUpload: getBoolean(getPrefix('UPDATE_BUCKET_POLICY_ON_EVERY_UPLOAD'), false),
        retention: {
            enabled: getBoolean(getPrefix('SCREENSHOT_RETENTION_ENABLED'), false),
            mode: getString(getPrefix('SCREENSHOT_RETENTION_MODE'), RETENTION_MODES.GOVERNANCE) as RETENTION_MODES,
            until: getNumber(getPrefix('SCREENSHOT_RETENTION_UNTIL'), 30),
            expiresChecksInterval: getNumber(getPrefix('SCREENSHOT_RETENTION_CHECK_INTERVAL'), 0.5),
        },
        compression: {
            width: getNumber(getPrefix('IMAGE_WIDTH'), 1275),
            height: getNumber(getPrefix('IMAGE_HEIGHT'), 750),
            fit: getString(getPrefix('IMAGE_FIT'), 'contain'),
            quality: getNumber(getPrefix('IMAGE_COMPRESSION_QUALITY'), 50),
        },
    },

    redis: {
        uri: getString(getPrefix('REDIS_URI'), 'redis://127.0.0.1:6379'),
    },

    bull: {
        persistJobs: getBoolean(getPrefix('BULL_PERSIST'), false),
        enableMonitor: getBoolean(getPrefix('BULL_MONITOR'), false),
    },

    session: {
        secret: getString(getPrefix('SESSION_SECRET'), 'localSecret'),
        lifetime: getString(getPrefix('SESSION_LIFETIME'), '1h'),
    },

    limiter: {
        api: getNumber(getPrefix('LIMITER_API'), 1000),
    },

    prometheus: {
        enabled: getBoolean(getPrefix('PROMETHEUS_ENABLED'), false),
        internal: getBoolean(getPrefix('PROMETHEUS_INTERNAL'), false),
        internalPort: getInteger(getPrefix('PROMETHEUS_INTERNAL_PORT'), 7788),
        external: getBoolean(getPrefix('PROMETHEUS_EXTERNAL'), false),
        externalPath: getString(getPrefix('PROMETHEUS_EXTERNAL_PATH'), '/metrics'),
        prefix: getString(getPrefix('PROMETHEUS_PREFIX'), 'app_'),
    },

    sentry: {
        org: getString(getPrefix('SENTRY_ORG'), 'vorp'),
        dsn: getString(getPrefix('SENTRY_DSN')),
        release: getString(getPrefix('SENTRY_RELEASE')),
        environment: getString(getPrefix('SENTRY_ENVIRONMENT')),
        tracing: getBoolean(getPrefix('SENTRY_TRACING'), true),
        tracesSampleRate: getNumber(getPrefix('SENTRY_TRACES_SAMPLE_RATE'), 1.0),
    },

    whatsapp: {
        accessToken: getString(getPrefix('WHATSAPP_ACCESS_TOKEN')),
        phoneNumberID: getString(getPrefix('WHATSAPP_PH_NUMBER_ID')),
        webhook: {
            token: getString(getPrefix('WHATSAPP_WEBHOOK_TOKEN')),
        },
    },
};

export type RuntimeConfig = typeof config;

const exitOnError = (error: string): void => {
    console.error(error);
    process.exit(1);
};

export const runValidityChecks = () => {
    if (!config.session.secret) {
        exitOnError(chalk.red('APP_SESSION_SECRET is missing in environment variables'));
    }
};

export default config;
