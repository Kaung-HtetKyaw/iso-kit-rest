import { TestCollections } from '../documents';
import createTest, { CreateTest } from './createTest';

export interface TestMutations {
    createTest: CreateTest;
}

export const createMutations = (collections: TestCollections): TestMutations => ({
    createTest: createTest(collections),
});
