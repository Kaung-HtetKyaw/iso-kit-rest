import { ObjectId } from 'mongodb';
import { z } from 'zod';

export type TestDocument = {
    _id: ObjectId;
    name: string;
};

export const TestSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string(),
});
