import config from '../../../core/config';
import { RouteEndpointHandler } from '../..';

export const verifyWhatsAppWebHook: RouteEndpointHandler = () => async (req, res, next) => {
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == config.whatsapp.webhook.token) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
};
