import { ObjectId } from 'mongodb';
import { MessageDocument, MessageCollections } from '../documents';

export type CreateMessageData = Omit<MessageDocument, '_id'>;

export type CreateMessage = (data: CreateMessageData, by?: ObjectId) => Promise<MessageDocument | null>;

export const createMessage =
    (collections: MessageCollections): CreateMessage =>
    async (data, by = null) => {
        await collections.messages.insertOne(data);

        return data;
    };

export default createMessage;
