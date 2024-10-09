import { RootFilterOperators, ObjectId } from 'mongodb';
import { TestCollections, TestDocument } from '../documents';

export type GetTestById = (id: ObjectId, filter?: RootFilterOperators<TestDocument>) => Promise<TestDocument | null>;

const getTestById =
    (collections: TestCollections): GetTestById =>
    (id, filter) =>
        collections.test.findOne({ ...filter, _id: id });

export default getTestById;
