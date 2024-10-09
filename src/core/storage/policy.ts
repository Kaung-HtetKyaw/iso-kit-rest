import { minioClient } from '.';

export const getPublicReadGetObjectPolicy = (bucket: string) => {
    return JSON.stringify({
        Version: '2012-10-17',
        Statement: [
            {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${bucket}/*`],
            },
        ],
    });
};

export const setBucketPublicForAnnonymous = async (bucket: string) => {
    await minioClient.setBucketPolicy(bucket, getPublicReadGetObjectPolicy(bucket));
};
