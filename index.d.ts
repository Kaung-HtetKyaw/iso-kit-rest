import { Request as OriginalRequest } from 'express-serve-static-core';
import { UserContext } from './src/middlewares/auth';

declare module 'express-serve-static-core' {
    interface Request extends OriginalRequest {
        context?: UserContext;
    }
}
