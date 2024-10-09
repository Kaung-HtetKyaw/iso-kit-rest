module.exports = {
    apps: [
        {
            name: 'VORP Chat',
            exec_mode: 'cluster',
            instances: '1',
            script: 'build/server.js',
            args: 'serve',
            env_local: {
                APP_SESSION_SECRET: 'localSecret',
                APP_SECURE_COOKIE: 'true',
                APP_COOKIE_POLICY: 'none',
                APP_DB_NAME: 'vorp',
                APP_DB_USER_NAME: 'vorp_dev',
                APP_DB_PASSWORD: 'vorp_dev@123',
                APP_DB_HOST: '192.168.1.125',
                APP_DB_PORT: '3306',
                APP_DB_DIALECT: 'mysql',
                APP_DB_POOL: '10',
                APP_SMTP_PORT: '1025',
                APP_STORAGE_ENDPOINT: 'localhost',
                APP_STORAGE_PORT: '9000',
                APP_STORAGE_SSL: 'false',
                APP_STORAGE_ACCESS_KEY: 'AKIAIOSFODNN7EXAMPLE',
                APP_STORAGE_SECRET_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                APP_HTML2PDF_ENDPOINT: 'http://localhost:4000/',
                APP_PROMETHEUS_ENABLED: 'true',
                APP_PROMETHEUS_EXTERNAL: 'true',
                APP_INCREMENT_SECONDS: '30',
                APP_DB_DB_USER_NAME: 'vorp_dev',
                APP_PROMETHEUS_INTERNAL: 'true',
                APP_PROMETHEUS_INTERNAL_PORT: '7788',
                APP_PROMETHEUS_EXTERNAL_PATH: '/metrics',
                APP_PROMETHEUS_PREFIX: 'app_',
                APP_HEALTH_WORKER_BEAT: '/health',
                APP_SENTRY_DSN: '',
                APP_SENTRY_RELEASE: '',
                APP_SENTRY_ENVIRONMENT: '',
                APP_SENTRY_TRACING: '',
                APP_SENTRY_TRACES_SAMPLE_RATE: '1.0',
                SENTRY_AUTH_TOKEN: '',
                APP_NAME: 'VORP Monitoring Server',
                APP_DEPENDS_ON_CLOCK: 'false',
                APP_STORAGE_BUCKET: 'vorp',
                APP_CREATE_BUCKET_IF_NOT_EXISTS: 'true',
                APP_SCREENSHOT_WIDTH: '1275',
                APP_SCREENSHOT_HEIGHT: '750',
                APP_SCREENSHOT_FIT: 'contain',
                APP_SCREENSHOT_QUALITY: '50',
                APP_SCREENSHOT_RETENTION_MODE: 'GOVERNANCE',
                APP_SCREENSHOT_RETENTION_UNTIL: '30',
                APP_SCREENSHOT_RETENTION_ENABLED: 'false',
                APP_SENTRY_ORG: 'vorp',
                APP_UPDATE_BUCKET_POLICY_ON_EVERY_UPLOAD: 'true',
                APP_TIME_ZONE: 'Asia/Hong_Kong',
                APP_TIME_ZONE_LOCALE: 'zh-HK',
                APP_12_HOUR_TIME: 'false',
                APP_SCREENSHOT_RETENTION_CHECK_INTERVAL: '0.5',
                APP_DB_URI: 'mongodb://root:password@127.0.0.1:27017',
                APP_WHATSAPP_ACCESS_TOKEN:
                    'EAAN1AZA97ZBDwBOZBMbLKdDG4grDtgFIzzCkLDLVGzMZCFh0uGZA9CdLnmrxRXsX2g2bfnrWwLbqawlCMyTNFWZAVmWvZAUfC3eZCDp6iiTZBGICewQZBj6OYPGdfPeeKKtE3CMgGqE6jbvmCwvsKU4f1NxxlpXuHjZCsE6oEZCuGYtaZBWFGNt21LPMIuzr9oCNm1HVXfB41Ni3ZAZC9ieMsT3xHPRK97urodw7XXPKcZAtr2GFKKIZD',
                APP_WHATSAPP_PH_NUMBER_ID: '355943190941983',
            },
            env_development: {
                APP_SESSION_SECRET: 'localSecret',
                APP_SECURE_COOKIE: 'true',
                APP_COOKIE_POLICY: 'none',
                APP_DB_NAME: 'vorp',
                APP_DB_USER_NAME: 'vorp_dev',
                APP_DB_PASSWORD: 'vorp_dev@123',
                APP_DB_HOST: '192.168.1.125',
                APP_DB_PORT: '3306',
                APP_DB_DIALECT: 'mysql',
                APP_DB_POOL: '10',
                APP_SMTP_PORT: '1025',
                APP_STORAGE_ENDPOINT: 'localhost',
                APP_STORAGE_PORT: '9000',
                APP_STORAGE_SSL: 'false',
                APP_STORAGE_ACCESS_KEY: 'AKIAIOSFODNN7EXAMPLE',
                APP_STORAGE_SECRET_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                APP_HTML2PDF_ENDPOINT: 'http://localhost:4000/',
                APP_PROMETHEUS_ENABLED: 'true',
                APP_PROMETHEUS_EXTERNAL: 'true',
                APP_INCREMENT_SECONDS: '30',
                APP_DB_DB_USER_NAME: 'vorp_dev',
                APP_PROMETHEUS_INTERNAL: 'true',
                APP_PROMETHEUS_INTERNAL_PORT: '7788',
                APP_PROMETHEUS_EXTERNAL_PATH: '/metrics',
                APP_PROMETHEUS_PREFIX: 'app_',
                APP_HEALTH_WORKER_BEAT: '/health',
                APP_SENTRY_DSN: '',
                APP_SENTRY_RELEASE: '',
                APP_SENTRY_ENVIRONMENT: '',
                APP_SENTRY_TRACING: '',
                APP_SENTRY_TRACES_SAMPLE_RATE: '1.0',
                SENTRY_AUTH_TOKEN: '',
                APP_NAME: 'VORP Monitoring Server',
                APP_DEPENDS_ON_CLOCK: 'false',
                APP_STORAGE_BUCKET: 'vorp',
                APP_CREATE_BUCKET_IF_NOT_EXISTS: 'true',
                APP_SCREENSHOT_WIDTH: '1275',
                APP_SCREENSHOT_HEIGHT: '750',
                APP_SCREENSHOT_FIT: 'contain',
                APP_SCREENSHOT_QUALITY: '50',
                APP_SCREENSHOT_RETENTION_MODE: 'GOVERNANCE',
                APP_SCREENSHOT_RETENTION_UNTIL: '30',
                APP_SCREENSHOT_RETENTION_ENABLED: 'false',
                APP_SENTRY_ORG: 'vorp',
                APP_UPDATE_BUCKET_POLICY_ON_EVERY_UPLOAD: 'true',
                APP_TIME_ZONE: 'Asia/Hong_Kong',
                APP_TIME_ZONE_LOCALE: 'zh-HK',
                APP_12_HOUR_TIME: 'false',
                APP_SCREENSHOT_RETENTION_CHECK_INTERVAL: '0.5',
                APP_DB_URI: 'mongodb://root:password@127.0.0.1:27017',
                APP_WHATSAPP_ACCESS_TOKEN:
                    'EAAN1AZA97ZBDwBOZBMbLKdDG4grDtgFIzzCkLDLVGzMZCFh0uGZA9CdLnmrxRXsX2g2bfnrWwLbqawlCMyTNFWZAVmWvZAUfC3eZCDp6iiTZBGICewQZBj6OYPGdfPeeKKtE3CMgGqE6jbvmCwvsKU4f1NxxlpXuHjZCsE6oEZCuGYtaZBWFGNt21LPMIuzr9oCNm1HVXfB41Ni3ZAZC9ieMsT3xHPRK97urodw7XXPKcZAtr2GFKKIZD',
                APP_WHATSAPP_PH_NUMBER_ID: '355943190941983',
            },
            env_production: {
                NODE_ENV: 'production',
                APP_SESSION_SECRET: 'localSecret',
                APP_SECURE_COOKIE: 'true',
                APP_COOKIE_POLICY: 'none',
                APP_DB_NAME: 'vorp',
                APP_DB_USER_NAME: 'vorp_dev',
                APP_DB_PASSWORD: 'vorp_dev@123',
                APP_DB_HOST: '192.168.1.125',
                APP_DB_PORT: '3306',
                APP_DB_DIALECT: 'mysql',
                APP_DB_POOL: '10',
                APP_SMTP_PORT: '1025',
                APP_STORAGE_ENDPOINT: 'localhost',
                APP_STORAGE_PORT: '9000',
                APP_STORAGE_SSL: 'false',
                APP_STORAGE_ACCESS_KEY: 'AKIAIOSFODNN7EXAMPLE',
                APP_STORAGE_SECRET_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                APP_HTML2PDF_ENDPOINT: 'http://localhost:4000/',
                APP_PROMETHEUS_ENABLED: 'true',
                APP_PROMETHEUS_EXTERNAL: 'true',
                APP_INCREMENT_SECONDS: '30',
                APP_DB_DB_USER_NAME: 'vorp_dev',
                APP_PROMETHEUS_INTERNAL: 'true',
                APP_PROMETHEUS_INTERNAL_PORT: '7788',
                APP_PROMETHEUS_EXTERNAL_PATH: '/metrics',
                APP_PROMETHEUS_PREFIX: 'app_',
                APP_HEALTH_WORKER_BEAT: '/health',
                APP_SENTRY_DSN: '',
                APP_SENTRY_RELEASE: '',
                APP_SENTRY_ENVIRONMENT: '',
                APP_SENTRY_TRACING: '',
                APP_SENTRY_TRACES_SAMPLE_RATE: '1.0',
                SENTRY_AUTH_TOKEN: '',
                APP_NAME: 'VORP Monitoring Server',
                APP_DEPENDS_ON_CLOCK: 'false',
                APP_STORAGE_BUCKET: 'vorp',
                APP_CREATE_BUCKET_IF_NOT_EXISTS: 'true',
                APP_SCREENSHOT_WIDTH: '1275',
                APP_SCREENSHOT_HEIGHT: '750',
                APP_SCREENSHOT_FIT: 'contain',
                APP_SCREENSHOT_QUALITY: '50',
                APP_SCREENSHOT_RETENTION_MODE: 'GOVERNANCE',
                APP_SCREENSHOT_RETENTION_UNTIL: '30',
                APP_SCREENSHOT_RETENTION_ENABLED: 'false',
                APP_SENTRY_ORG: 'vorp',
                APP_UPDATE_BUCKET_POLICY_ON_EVERY_UPLOAD: 'true',
                APP_TIME_ZONE: 'Asia/Hong_Kong',
                APP_TIME_ZONE_LOCALE: 'zh-HK',
                APP_12_HOUR_TIME: 'false',
                APP_SCREENSHOT_RETENTION_CHECK_INTERVAL: '0.5',
                APP_DB_URI: 'mongodb://root:password@127.0.0.1:27017',
                APP_WHATSAPP_ACCESS_TOKEN:
                    'EAAN1AZA97ZBDwBOZBMbLKdDG4grDtgFIzzCkLDLVGzMZCFh0uGZA9CdLnmrxRXsX2g2bfnrWwLbqawlCMyTNFWZAVmWvZAUfC3eZCDp6iiTZBGICewQZBj6OYPGdfPeeKKtE3CMgGqE6jbvmCwvsKU4f1NxxlpXuHjZCsE6oEZCuGYtaZBWFGNt21LPMIuzr9oCNm1HVXfB41Ni3ZAZC9ieMsT3xHPRK97urodw7XXPKcZAtr2GFKKIZD',
                APP_WHATSAPP_PH_NUMBER_ID: '355943190941983',
            },
        },
    ],
};
