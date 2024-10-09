import chalk from 'chalk';
import { RecipientTypesEnum, SocketEventHandler, SocketType } from '../types';
import { EventTypes } from '../keys';
import { WhatsappMessageTypes, WhatsappMessageTypesEnum } from '../../../routers/webhooks/types';
import config from '../../config';
import { sendWhatsAppTextMessage } from '../../../shared/whatsapp';

export type UserSocket = {
    phoneNumber: string;
    socketId: string;
};

export type OnSendMessageData = {
    from: UserSocket;
    to: UserSocket;
    content: string;
    recipient_type?: RecipientTypesEnum;
    type?: WhatsappMessageTypesEnum;
};

const getTextMessage = (
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

export const onSendMessage: SocketEventHandler<(data: OnSendMessageData, cb: () => void) => Promise<void>> =
    ({ socket, operations }) =>
    async (data, cb) => {
        const { recipient_type, content, to, from, type } = data;
        console.log('MESSAGE is received');
        console.log(data);
        // TODO: implementation details
        switch (recipient_type) {
            case 'individual':
                await sendWhatsAppTextMessage({
                    from: { phone_number_id: socket.request.context.phoneNumberInfo.phone_number_id },
                    to: { display_phone_number: to.phoneNumber },
                    recipient_type: recipient_type || 'individual',
                    type: type || 'text',
                    content,
                });

                await operations.regular.createMessage({
                    content,
                    to: to.phoneNumber,
                    from: from.phoneNumber,
                    timestamp: new Date().getTime(),
                    whatsapp: getTextMessage(
                        {
                            display_phone_number: from.phoneNumber,
                            phone_number_id: socket.request.context.phoneNumberInfo.phone_number_id,
                        },
                        to.phoneNumber,
                        content
                    ),
                });

                if (to.socketId) {
                    // emit new event to socket
                    socket.to(to.socketId).emit(EventTypes['new-message'], { content, to, from });
                }

                // execute callback passed from frontend
                if (cb) {
                    cb();
                }

                return;
            case 'group':
                const payload = { content, to, from };
                socket.to(to.socketId).emit(EventTypes['new-message'], payload);

                return;
            default:
                console.info(chalk.red(`Error: `), 'Unsupported recipient type: ', chalk.cyan(recipient_type));
        }
    };
