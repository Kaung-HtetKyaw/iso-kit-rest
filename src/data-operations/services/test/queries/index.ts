import { TestCollections } from '../documents';
import getTestById, { GetTestById } from './getTestById';
import getTestDocuments, { GetTestDocuments } from './getTestDocuments';

export interface TestQueries {
    getTestById: GetTestById;
    getTestDocuments: GetTestDocuments;
}

export const createQueries = (collections: TestCollections): TestQueries => ({
    getTestById: getTestById(collections),
    getTestDocuments: getTestDocuments(collections),
});
