import { WhatsappEntryDetails } from '../routers/webhooks/types';

export const getMessageFromWhatsappMessage = (message: WhatsappEntryDetails) => {
    return message?.[0]?.changes?.[0]?.value.messages?.[0];
};
