import { WhatsappMessageTypes, WhatsappMessageTypesEnum } from '../../routers/webhooks/types';

export type RawMessageDetails = {
    
    type:WhatsappMessageTypesEnum
}

export const getNormalizedWhatsappTextMessage = (
    from: { display_phone_number: string; phone_number_id: string },
    to: string,
    content: string
) => {
    return [
        {
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: from,
                        contacts: [{ profile: { name: 'Kaung Htet Kyaw ( Kole )' }, wa_id: to }],
                        messages: [
                            {
                                context: {
                                    from: from.display_phone_number,
                                },
                                from: from.display_phone_number,
                                timestamp: new Date().getTime().toString(),
                                text: { body: content },
                                type: WhatsappMessageTypes.text,
                                to,
                            },
                        ],
                    },
                    field: 'messages',
                },
            ],
        },
    ];
};

export const getNormalizedWhatsappMessage= () => {

}