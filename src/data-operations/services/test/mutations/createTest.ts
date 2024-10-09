import { ObjectId } from 'mongodb';
import { TestDocument, TestCollections } from '../documents';

export type CreateTestData = {
    name: string;
};

export type CreateTest = (data: CreateTestData, by?: ObjectId | null) => Promise<TestDocument>;

const createTest =
    (collections: TestCollections): CreateTest =>
    async (data, by = null) => {
        const document = {
            _id: new ObjectId(),
            ...data,
            at: new Date(),
            by,
        };
        await collections.test.insertOne(document);

        return document;
    };

export default createTest;
