import { MessageCollections } from '../documents';
import { createMessage, CreateMessage } from './createMessage';

export interface MessageMutations {
    createMessage: CreateMessage;
}

export const createMutations = (collections: MessageCollections): MessageMutations => ({
    createMessage: createMessage(collections),
});
