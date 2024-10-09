import { RootFilterOperators, ObjectId } from 'mongodb';
import { TestCollections, TestDocument } from '../documents';

export type GetTestDocuments = () => Promise<TestDocument[] | null>;

const getTestDocuments =
    (collections: TestCollections): GetTestDocuments =>
    () =>
        collections.test.find().toArray();

export default getTestDocuments;
