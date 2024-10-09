import { LifecycleConfig, LifecycleRule } from 'minio';
import { minioClient } from '.';
import config from '../config';
import { setBucketPublicForAnnonymous } from './policy';
import { SCREENSHOT } from './constants';
import { Expiration } from 'minio/dist/main/internal/type';

export const bucketLifeCycleConfig: LifecycleConfig = {
    Rule: [
        {
            ID: 'Screenshot-Expiration-Rule',
            Status: 'Enabled',
            Prefix: `${SCREENSHOT}/`,
            Expiration: {
                Days: config.storage.retention.until,
            } as Expiration,
        },
    ],
};

export const makePublicBucket = async (bucket: string, region?: string) => {
    await minioClient.makeBucket(
        bucket,
        region || config.storage.provider.region,
        { ObjectLocking: true },
        // @ts-ignore
        async err => {
            if (err) {
                console.error(`Error creating bucket: ${bucket} in region: ${config.storage.provider.region}\n`);
                console.error(err);
                return;
            }

            await setBucketPublicForAnnonymous(bucket);

            await minioClient.setBucketLifecycle(bucket, bucketLifeCycleConfig);
        }
    );
};
