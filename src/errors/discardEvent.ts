import chalk from 'chalk';

export const discardEventLogger = ({
    message,
    error,
    eventType,
}: {
    message: string;
    error?: Error;
    eventType?: string;
}) => {
    console.info(chalk.red(`Discard event: ${eventType ?? 'unknown'}. `), message);
    if (error) {
        console.error(error);
    }
};
