import { Redis } from 'ioredis';
import { DatabaseContext } from './database';

declare global {
    declare module NodeJS {
        interface Global {
            dbClient?: {
                context: Pick<DatabaseContext, 'regular' | 'models'>;
                promise: Promise<Pick<DatabaseContext, 'regular' | 'models'>>;
            };
            redis?: Redis;
        }
    }

    declare module 'express-serve-static-core' {
        interface Request {
            myProp?: boolean;
        }
    }
}
