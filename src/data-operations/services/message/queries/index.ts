import { MessageCollections } from '../documents';
import getMessagesByParticipantIds, { GetMessagesByParticipantIds } from './getMessagesByParticipantIds';

export interface MessageQueries {
    getMessagesByParticipantIds: GetMessagesByParticipantIds;
}

export const createQueries = (collections: MessageCollections): MessageQueries => ({
    getMessagesByParticipantIds: getMessagesByParticipantIds(collections),
});
