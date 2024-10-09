import { Router, Request } from 'express';
import { RouterHander } from '..';
import { getPhoneNumberById } from './getPhoneNumberById';
import { createPhoneNumberInfo } from './createPhoneNumberInfo';

const phoneNumberRouter: RouterHander = ({ operations, io }): Router => {
    const router = Router();

    router.post('/', createPhoneNumberInfo({ operations, io }));
    router.get('/:id', getPhoneNumberById({ operations, io }));

    return router;
};

export default phoneNumberRouter;
