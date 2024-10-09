import { ObjectId } from 'mongodb';
import { HandlerContext, RouteEndpointHandler } from '..';
import { WhatsappGenericMessage, WhatsappMessageTypes } from '../webhooks/types';
import { getMessageFromWhatsappMessage } from '../../shared/utils';

export type GetMessagesByParticipantsParams = {
    from: string;
    to: string;
};

export type MessageContact = {
    profile?: {
        name: string;
    };
    display_phone_number?: string;
};

export type GetMessagesByParticipantsResponse<T = WhatsappGenericMessage> = {
    id: ObjectId;
    from: string;
    to: string;
    contacts?: MessageContact[];
    message: T;
};

export const getMessagesByParticipants: RouteEndpointHandler<{}, {}, {}, GetMessagesByParticipantsParams> =
    (context: HandlerContext) => async (req, res, next) => {
        const { from, to } = req.query;

        const { edges, totalCount, pageInfo } = await context.operations.regular.getMessagesByParticipantIds(
            [from, to].filter(Boolean)
        );

        const result: GetMessagesByParticipantsResponse[] = edges.map(el => {
            const message = el.content
                ? {
                      from: el.from,
                      to: el.to,
                      type: WhatsappMessageTypes.text,
                      text: { body: el.content },
                      timestamp: el.timestamp ? el.timestamp.toString() : undefined,
                  }
                : getMessageFromWhatsappMessage(el.whatsapp);

            return {
                id: el._id,
                to: el.to,
                from: el.from,
                contacts: el.whatsapp?.[0]?.changes?.[0]?.value?.contacts || [],
                message,
            };
        });

        res.status(200).json({ data: { totalCount, pageInfo, edges: result } });
    };
