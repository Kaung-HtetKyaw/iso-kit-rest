import { Router, Request } from 'express';
import { verifyWhatsAppWebHook } from './verify';
import { Operations } from '../../../data-operations';
import { receivedWhatsAppWebHook } from './received';
import { RouterHander } from '../..';

const whatsappWebhooksRouter: RouterHander = ({ operations, io }): Router => {
    const router = Router();

    router.get('/', verifyWhatsAppWebHook({ operations, io }));
    router.post('/', receivedWhatsAppWebHook({ operations, io }));

    return router;
};

export default whatsappWebhooksRouter;
