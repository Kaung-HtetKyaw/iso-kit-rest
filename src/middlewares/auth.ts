import { promisify } from 'util';
import { MiddlewareHandler } from '../routers';
import { verifyJwtToken } from './utils';
import { PhoneNumberInfoAttributes } from '../integrated-database/data-operations/services/employees/documents';

export type UserContext = {
    phoneNumberInfo: PhoneNumberInfoAttributes;
};

export const authMiddleware: MiddlewareHandler = context => async (req, res, next) => {
    // const payload = await verifyJwtToken()

    const data = await context.operations.integrated.getPhoneNumberInfoById({ id: '1' });

    // attach phone number context to request object
    req.context = { phoneNumberInfo: data.data };

    next();
};
