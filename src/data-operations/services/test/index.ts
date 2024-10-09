import { Db } from 'mongodb';
import { TEST } from '../../utils/collections';
import { createMutations, TestMutations } from './mutations';
import { createQueries, TestQueries } from './queries';
import { TestDocument, TestCollections } from './documents';

export type { TestCollections };

export interface TestOperations extends TestQueries, TestMutations {}

export interface TestService {
    collections: TestCollections;
    operations: TestOperations;
}

const createTestService = (db: Db): TestService => {
    const collections: TestCollections = {
        test: db.collection<TestDocument>(TEST),
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
