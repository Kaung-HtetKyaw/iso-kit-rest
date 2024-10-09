import jwt, { Algorithm, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const defaultVerifyOptions: VerifyOptions = {
    algorithms: ['HS256'],
};

export const verifyJwtToken = (token: string, secretKey: string, options: VerifyOptions = defaultVerifyOptions) => {
    return new Promise((resolve, reject) => {
        console.log(token);
        console.log(secretKey);
        console.log(options);
        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        });
    });
};
