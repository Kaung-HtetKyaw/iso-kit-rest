import { RouteEndpointHandler } from '../..';
import { EventTypes } from '../../../core/socket';
import { MessageDocument } from '../../../data-operations/services/message/documents';
import { WhatsappMessageReqBody, WhatsappTextMessage } from '../types';

export const receivedWhatsAppWebHook: RouteEndpointHandler<{}, {}, WhatsappMessageReqBody<WhatsappTextMessage>> =
    context => async (req, res, next) => {
        const { operations, io } = context;
        console.log('Facebook request body:', JSON.stringify(req.body));

        const contacts = req.body.entry[0].changes[0].value.contacts;

        if (!contacts) {
            return;
        }

        const to = req.body.entry[0].changes[0].value.metadata.display_phone_number;
        const from = contacts?.[0]?.wa_id;

        if (!to || !from) {
            // res.sendStatus(400);
            return;
        }

        // get from and to id
        const document: MessageDocument = {
            from,
            to,
            wa_mid: req.body.entry[0].changes[0].value.messages[0].id,
            whatsapp: req.body.entry,
        };

        await operations.regular.createMessage(document);
        console.log(EventTypes['new-received-message']);
        io.emit(EventTypes['new-received-message'], { from, to });

        res.status(200).send(document);
    };
