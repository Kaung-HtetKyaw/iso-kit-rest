# Settings

All settings are defined through environment variable.

## Global configuration

| Name                     | Type     | Default                    | Comment                            |
| ------------------------ | -------- | -------------------------- | ---------------------------------- |
| VERSION                  | String   | 0.0.0-development          | Application version                |
| APP_PUBLIC_PATH          | String   | /public/                   | Public path for assets             |
| APP_PORT                 | Number   | 3000                       | HTTP server listening port         |
| APP_GZIP                 | Boolean  | true                       | Enable GZip compression            |
| APP_SECURE_COOKIE        | Boolean  | true                       | Enable secure cookies              |
| APP_COOKIE_POLICY        | String   | strict                     | Cookie sameSite policy             |
| APP_DEBUG                | Boolean  | false                      | Enable debug mode                  |
| APP_ENDPOINT             | String   | http://localhost:$APP_PORT | Application endpoint use for links |
| APP_VERBOSE              | Boolean  | true                       | Enable console logs                |
| APP_ALLOWED_DOMAINS      | String[] | []                         | Allowed Domains                    |
| APP_SOCKET_CLIENT_DOMAIN | String   |                            | Socket client domain               |

It's recommended to disable compression if you may delegate it to a reverse proxy.

## Database configuration

| Name            | Type   | Default                       | Comment             |
| --------------- | ------ | ----------------------------- | ------------------- |
| APP_DB_NAME     | String | vorp                          | Database Name       |
| APP_DB_URI      | String | mongodb+srv://localhost:27017 | Database URI String |
| APP_DB_USERNAME | String | root                          | Database Username   |
| APP_DB_PASSWORD | String | mongodb+srv://localhost:27017 | Database Password   |

## Redis configuration

| Name          | Type   | Default                | Comment                 |
| ------------- | ------ | ---------------------- | ----------------------- |
| APP_REDIS_URI | String | redis://127.0.0.1:6379 | Redis connection string |

## Bull configuration

| Name             | Type    | Default | Comment                                        |
| ---------------- | ------- | ------- | ---------------------------------------------- |
| APP_BULL_PERSIST | Boolean | false   | Set default behavior to not drop redis entries |
| APP_BULL_MONITOR | Boolean | false   | Serve bull monitor endpoint on web server      |

Monitor cannot be turned on when running on production environment, that could lead to a leak on sensitive data.
The previous settings are only meant for debug purposes.

## Health checks configuration

| Name                   | Type    | Default             | Comment                                       |
| ---------------------- | ------- | ------------------- | --------------------------------------------- |
| APP_HEALTH_ENABLED     | Boolean | false               | Serve health checks                           |
| APP_HEALTH_PORT        | Number  | 4000                | Port on which serve the health checks         |
| APP_HEALTH_ALLOWED     | String  | ::1/128,127.0.0.0/8 | Allowed CIDR for the health checks            |
| APP_HEALTH_WORKER_BEAT | String  |                     | URL for worker beat pushes                    |
| APP_LOG_WORKER_BEAT    | Boolean | true                | Wether or not to log worker beat console logs |

## Session configuration

| Name                 | Type   | Default | Comment                                        |
| -------------------- | ------ | ------- | ---------------------------------------------- |
| APP_SESSION_SECRET   | String |         | Secret use for JWT signature on session tokens |
| APP_SESSION_LIFETIME | String | 1h      | Session token lifetime                         |

## Storage configuration

| Name                                     | Type                         | Default        | Comment                                                                                                                |
| ---------------------------------------- | ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| APP_STORAGE_ENDPOINT                     | String                       |                | API endpoint for the Object storage                                                                                    |
| APP_STORAGE_ACCESS_KEY                   | String                       |                | Access Key for object storage                                                                                          |
| APP_STORAGE_SECRET_KEY                   | String                       |                | Secret Key for object storage                                                                                          |
| APP_STORAGE_SSL                          | Boolean                      | true           | Use TLS with the object storage                                                                                        |
| APP_STORAGE_PORT                         | Number                       |                | Port on which the API endpoint is served                                                                               |
| APP_STORAGE_REGION                       | String                       | ap-southeast-1 | Object storage region                                                                                                  |
| APP_STORAGE_BUCKET                       | String                       | app            | Bucket name for the object storage                                                                                     |
| APP_RETENTION_ENABLED                    | Boolean                      | false          | Enable Retention for Screenshot object                                                                                 |
| APP_IMAGE_RETENTION_MODE                 | "GOVERNANCE" or "COMPLIANCE" | GOVERNANCE     | [S3 Object Locking Modes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-overview) |
| APP_RETENTION_UNTIL                      | Number                       | 30             | Rention period in days                                                                                                 |
| APP_CREATE_BUCKET_IF_NOT_EXISTS          | Boolean                      | false          | Create a bucket if not exists                                                                                          |
| APP_UPDATE_BUCKET_POLICY_ON_EVERY_UPLOAD | Boolean                      | false          | Update Bucket Policy to the latest configs                                                                             |
| APP_RETENTION_CHECK_INTERVAL             | Number                       | 0.5            | Interval in days to check and delete expired screenshots                                                               |

## Sentry configuration

| Name                          | Type    | Default | Comment                               |
| ----------------------------- | ------- | ------- | ------------------------------------- |
| APP_SENTRY_DSN                | String  |         | Sentry DSN                            |
| APP_SENTRY_RELEASE            | String  |         | Sentry version                        |
| APP_SENTRY_ENVIRONMENT        | String  |         | Sentry environment                    |
| APP_SENTRY_TRACING            | Boolean | true    | Enable Sentry tracing                 |
| APP_SENTRY_TRACES_SAMPLE_RATE | Number  | 1.0     | Sentry traces sample rate for tracing |

## Limiter configuration

| Name            | Type   | Default | Comment                                   |
| --------------- | ------ | ------- | ----------------------------------------- |
| APP_LIMITER_API | Number | 1000    | Rate limiter per second per IP on the API |
