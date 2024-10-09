import { Request, Response } from 'express';
import config from '../../core/config';
import { HandlerContext, RouteEndpointHandler } from '..';
import {
    PhoneNumberInfoInput,
    PhoneNumberInfoSchema,
} from '../../integrated-database/data-operations/services/employees/documents';

export const createPhoneNumberInfo: RouteEndpointHandler<{}, {}, PhoneNumberInfoInput> =
    (context: HandlerContext) => async (req, res, next) => {
        const { success, error, data } = PhoneNumberInfoSchema.safeParse(req.body);

        if (!data) {
            res.status(400).json({ success, error, data });
        }

        await context.operations.integrated.createPhoneNumberInfo(data);

        res.status(200).json({ success, error, data });
    };
