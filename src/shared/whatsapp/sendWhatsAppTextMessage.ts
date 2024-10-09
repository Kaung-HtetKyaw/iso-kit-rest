import config from '../../core/config';
import { RecipientTypesEnum } from '../../core/socket';
import { WhatsappMessageTypesEnum } from '../../routers/webhooks/types';

export type SendWhatsAppTextMessage = {
    from: { display_phone_number?: string; phone_number_id?: string };
    to: { display_phone_number?: string; phone_number_id?: string };
    recipient_type: RecipientTypesEnum;
    type: WhatsappMessageTypesEnum;
    content: string;
};

export const sendWhatsAppTextMessage = async (data: SendWhatsAppTextMessage) => {
    const { to, from, recipient_type, type, content } = data;
    console.log('Inside a new');
    console.log(data);
    await fetch(`https://graph.facebook.com/v20.0/${from.phone_number_id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.whatsapp.accessToken}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type,
            to: to.display_phone_number,
            type,
            text: {
                preview_url: true,
                body: content,
            },
        }),
    });
};
