import { Router, Request } from 'express';
import { Operations } from '../../data-operations';
import { sendWhatsAppTextMessageHandler } from './sendTextMessage';
import { sendWhatsImageMessageHandler } from './sendMediaMessage';
import whatsappWebhooksRouter from '../webhooks/whatsapp';
import { RouterHander } from '..';

const whatsAppRouter: RouterHander = ({ operations, io }): Router => {
    const router = Router();

    router.post('/text-message', sendWhatsAppTextMessageHandler({ operations, io }));
    router.post('/image-message', sendWhatsImageMessageHandler({ operations, io }));

    router.use('/webhooks', whatsappWebhooksRouter({ operations, io }));

    return router;
};

export default whatsAppRouter;
