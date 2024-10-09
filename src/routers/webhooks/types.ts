export type WhatsappMessageReqBody<T = WhatsappGenericMessage> = { object: string; entry: WhatsappEntryDetails<T> };

export type WhatsappEntryDetails<T = WhatsappGenericMessage> = {
    id?: string;
    changes: {
        value: {
            messaging_product: string;
            metadata: WhatsappMessageMetadata;
            statuses?: WhatsappEntryChangeStatus[] | undefined | null;
            contacts?: WhatsappMessageContact[] | undefined | null;
            messages?: T[];
        };
        field: string;
    }[];
}[];

export interface WhatsappGenericMessage {
    id?: string;
    from: string;
    to: string;
    timestamp: string;
    type: WhatsappMessageTypesEnum;
}

export type WhatsappEntryChangeStatus = {
    id?: string;
    status: WhatsappMessageStatusesEnum;
    timestamp: string;
    recipient_id: string;
    conversation: { id: string; origin: { type: string } };
    pricing: { billable: boolean; pricing_model: string; category: string };
};

export type WhatsappMessageContact = {
    profile: { name: string };
    wa_id?: string;
};

export type WhatsappMessageMetadata = {
    display_phone_number: string;
    phone_number_id: string;
};

export const WhatsappMessageTypes = {
    text: 'text',
    reaction: 'reaction',
    image: 'image',
    audio: 'audio',
    document: 'document',
    video: 'video',
    location: 'location',
    contacts: 'contacts',
    interactive: 'interactive',
} as const;

export type WhatsappMessageTypesEnum = keyof typeof WhatsappMessageTypes;

export const WhatsappMessageStatuses = { delivered: 'delivered', sent: 'sent', read: 'read' } as const;
export type WhatsappMessageStatusesEnum = keyof typeof WhatsappMessageStatuses;

export interface WhatsappTextMessage extends WhatsappGenericMessage {
    text: {
        preview_url: boolean;
        body: string;
    };
}

export interface WhatsappReactionMessage extends WhatsappGenericMessage {
    reaction: {
        message_id: string;
        emoji: string;
    };
}

export interface WhatsappImageMessage extends WhatsappGenericMessage {
    image: {
        id: string;
        link: string;
        caption: string;
    };
}

export interface WhatsappVideoMessage extends WhatsappGenericMessage {
    video: {
        id: string;
        link: string;
        caption: string;
    };
}

export interface WhatsappDocumentMessage extends WhatsappGenericMessage {
    document: {
        id: string;
        link: string;
        caption: string;
        filename: string;
    };
}

export interface WhatsappLocationMessage extends WhatsappGenericMessage {
    location: {
        latitude: string;
        longitude: string;
        name: string;
        address: string;
    };
}
