export type InvalidRequestError = { message: string; error: Error };

export const getInvalidReqError = (message: string): InvalidRequestError => {
    return { message, error: new Error(message) };
};
