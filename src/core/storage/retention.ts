import { Retention, RETENTION_MODES, RetentionOptions } from 'minio';
import { minioClient, UploadedFile } from '.';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import config from '../config';
import chalk from 'chalk';

export const getObjectExpirationDate = () => {
    return dayjs().add(config.storage.retention.until, 'days').toISOString();
};

export const putObjectRetentionUntil = async ({
    uploadedFile,
    retentionOpts,
}: {
    uploadedFile: UploadedFile;
    retentionOpts?: Partial<RetentionOptions>;
}) => {
    if (!uploadedFile?.bucketName || !uploadedFile?.objectName || !uploadedFile?.versionId) {
        console.info(chalk.red(`Insufficient informations to set retention on object`));
        return uploadedFile;
    }

    try {
        await minioClient.putObjectRetention(uploadedFile?.bucketName, uploadedFile?.objectName, {
            mode: config.storage.retention.mode,
            retainUntilDate: getObjectExpirationDate(),
            versionId: uploadedFile?.versionId,
            ...retentionOpts,
        });

        return uploadedFile;
    } catch (err) {
        console.info(
            chalk.red(
                `Failed to set retention on object: ${uploadedFile.objectName} in bucket: ${uploadedFile.bucketName}`
            )
        );

        console.error(err);

        return uploadedFile;
    }
};
