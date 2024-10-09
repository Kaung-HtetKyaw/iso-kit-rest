import path from 'path';
import { Readable as ReadableStream } from 'stream';
import { ItemBucketMetadata, Client, RETENTION_MODES, LifecycleRule } from 'minio';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import { SCREENSHOT } from './constants';
import { getScreenshotFilename, getScreenshotFilenamePrefix } from './utils';
import chalk from 'chalk';
import { bucketLifeCycleConfig, makePublicBucket } from './bucket';
import { putObjectRetentionUntil } from './retention';
import dayjs from 'dayjs';

export const minioClient = new Client(config.storage.provider);

export interface UploadedFile {
    id?: string;
    filename?: string;
    displayName?: string;
    objectName: string;
    bucketName?: string;
    etag?: string;
    size?: number;
    uploadedAt?: Date;
    versionId?: string;
}

export type ReadableFileStreamContent = ReadableStream | Buffer | string;

export type ReadableFileStreamObject = { name: string; file: ReadableFileStreamContent };

export const uploadFile = async ({
    dirName,
    filename,
    stream,
    metadata,
    bucket = config.storage.bucket,
}: {
    dirName: string;
    filename: string;
    stream: ReadableFileStreamContent;
    metadata?: ItemBucketMetadata;
    bucket?: string;
}): Promise<UploadedFile | null> => {
    const fileId = uuidv4();
    const ext = path.extname(filename);
    const objectName = path.join(dirName, `${fileId}${ext}`);

    const exists = await minioClient.bucketExists(bucket);

    if (!exists) {
        if (!config.storage.createBucketIfNotExists) {
            console.info(
                chalk.yellow(
                    `Bucket with name:${bucket} does not exists. Either create one or enable {config.storage.createBucketIfNotExists} in the options`
                )
            );

            return null;
        }

        await makePublicBucket(bucket, config.storage.provider.region);
    }

    if (config.storage.updateBucketPolicyOnUpload) {
        await minioClient.setBucketLifecycle(bucket, bucketLifeCycleConfig);
    }

    // upload it at first
    // @ts-ignore
    const { etag, versionId } = await minioClient.putObject(bucket, objectName, stream, {
        ...metadata,
        id: fileId,
    });

    // get stats from it
    const stats = await minioClient.statObject(bucket, objectName);

    return {
        id: fileId,
        filename,
        displayName: filename,
        uploadedAt: new Date(),
        versionId,
        etag,
        size: stats.size,
        objectName,
        bucketName: bucket,
    };
};

export const getSignedUrlOnUploadedFile = ({
    file,
    bucket = config.storage.bucket,
    expiry = 60,
}: {
    file: UploadedFile;
    expiry: number;
    bucket?: string;
}): Promise<string> => minioClient.presignedGetObject(bucket, file.objectName, expiry);

export const getFileStream = ({
    file,
    bucket = config.storage.bucket,
}: {
    file: UploadedFile;
    bucket?: string;
}): Promise<ReadableStream> => minioClient.getObject(bucket, file.objectName);

export const deleteUploadedFile = ({
    file,
    bucket = config.storage.bucket,
}: {
    file: UploadedFile;
    bucket?: string;
}): Promise<void> => minioClient.removeObject(bucket, file.objectName);

export const deleteUploadedFiles = ({
    files,
    bucket = config.storage.bucket,
}: {
    files: UploadedFile[];
    bucket?: string;
}): Promise<void> =>
    minioClient.removeObjects(
        bucket,
        files.map(file => file.objectName)
    );

export const handleFileUpload = async ({
    dirName,
    file,
    metadata,
}: {
    dirName: string;
    file: ReadableFileStreamObject;
    metadata?: ItemBucketMetadata;
}): Promise<UploadedFile | null> => uploadFile({ dirName, filename: file.name, stream: file.file, metadata });

export const handleMultipleFileUpload = async ({
    dirName,
    files,
    metadata,
}: {
    dirName: string;
    files: ReadableFileStreamObject[];
    metadata?: ItemBucketMetadata;
}): Promise<(UploadedFile | null)[]> =>
    Promise.all(files.map(upload => handleFileUpload({ dirName, file: upload, metadata })));

export const cloneFile = async ({
    dirName,
    upload,
    metadata,
    bucket = config.storage.bucket,
}: {
    dirName: string;
    upload: UploadedFile;
    metadata?: ItemBucketMetadata;
    bucket?: string;
}): Promise<UploadedFile | null> =>
    uploadFile({ dirName, filename: upload.filename, stream: await getFileStream({ file: upload, bucket }), metadata });

export const handleScreenshotFileUpload = async ({
    file,
    metadata,
}: {
    file: ReadableFileStreamContent;
    metadata?: ItemBucketMetadata;
}): Promise<UploadedFile | null> => {
    const uploadedFile = await uploadFile({
        dirName: SCREENSHOT,
        filename: getScreenshotFilename(),
        stream: file,
        metadata,
    });

    if (!config.storage.retention.enabled) {
        return uploadedFile;
    }

    return putObjectRetentionUntil({
        uploadedFile,
        retentionOpts: {
            retainUntilDate: dayjs().add(60, 'seconds').toISOString(),
            versionId: uploadedFile?.versionId,
        },
    });
};
