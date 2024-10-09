import { SCREENSHOT, SCREENSHOT_EXTENSION } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const getScreenshotFilenamePrefix = () => {
    return `${uuidv4()}-${new Date().toISOString()}`;
};

export const getScreenshotFilename = () => {
    return `${getScreenshotFilenamePrefix()}.${SCREENSHOT_EXTENSION}`;
};
