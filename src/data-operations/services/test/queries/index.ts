import { TestCollections } from '../documents';
import getTestById, { GetTestById } from './getTestById';

export interface TestQueries {
    getTestById: GetTestById;
}

export const createQueries = (collections: TestCollections): TestQueries => ({
    getTestById: getTestById(collections),
});
