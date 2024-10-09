import { Request, Response } from 'express';
import config from '../../core/config';
import { RouteEndpointHandler } from '..';
import { sendWhatsAppTextMessage } from '../../shared/whatsapp';
import { WhatsappMessageTypesEnum } from '../webhooks/types';
import { RecipientTypesEnum } from '../../core/socket';

export type SendWhatsAppTextMessageRouteParams = {
    phone_number_id: string;
    to: string;
    type: WhatsappMessageTypesEnum;
    recipient_type: RecipientTypesEnum;
    content: string;
};

export const sendWhatsAppTextMessageHandler: RouteEndpointHandler =
    () => async (req: Request<SendWhatsAppTextMessageRouteParams, {}, {}>, res: Response, next) => {
        const { phone_number_id, to, type, recipient_type, content } = req.params;

        const response = await sendWhatsAppTextMessage({
            from: { phone_number_id },
            to: { display_phone_number: to },
            recipient_type,
            type,
            content,
        });

        res.status(200).json(response);
    };
