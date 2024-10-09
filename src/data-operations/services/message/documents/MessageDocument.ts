import { ObjectId } from 'mongodb';
import { DocumentList } from '../../sharedTypes';
import { z } from 'zod';

export const MessageSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    content: z.string().optional(),
    from: z.string(),
    to: z.string(),
    wa_mid: z.string().optional().nullable(),
    wa_statusid: z.string().optional().nullable(),
    timestamp: z.number(),
});

export type MessageDocument = z.infer<typeof MessageSchema>;

export type MessageDocumentList = DocumentList<MessageDocument>;
