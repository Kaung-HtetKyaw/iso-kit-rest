import { Db } from 'mongodb';
import { MESSAGE, TEST } from '../../utils/collections';
import { createMutations, MessageMutations } from './mutations';
import { createQueries, MessageQueries } from './queries';
import { MessageDocument, MessageCollections } from './documents';

export type { MessageCollections };

export interface MessageOperations extends MessageQueries, MessageMutations {}

export interface MessageService {
    collections: MessageCollections;
    operations: MessageOperations;
}

const createTestService = (db: Db): MessageService => {
    const collections: MessageCollections = {
        messages: db.collection<MessageDocument>(MESSAGE),
    };

    return {
        collections,
        operations: {
            ...createQueries(collections),
            ...createMutations(collections),
        },
    };
};

export default createTestService;
