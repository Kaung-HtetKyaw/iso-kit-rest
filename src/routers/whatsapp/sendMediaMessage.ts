import { Request, Response } from 'express';
import config from '../../core/config';
import { HandlerContext } from '..';

export const sendWhatsImageMessageHandler =
    (context: HandlerContext) => async (req: Request<{}, {}, {}>, res: Response, next) => {
        const response = await fetch(`https://graph.facebook.com/v20.0/${config.whatsapp.phoneNumberID}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.whatsapp.accessToken}`,
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: '66825904351',
                type: 'image',
                image: {
                    link: 'https://verloop.io/wp-content/uploads/Meta-WhatsApp-Cloud-API-Announcement-scaled.jpg' /* Only if linking to your media */,
                    caption: 'Whatsapp Cloud API',
                },
            }),
        });

        res.status(200).json(response);
    };
