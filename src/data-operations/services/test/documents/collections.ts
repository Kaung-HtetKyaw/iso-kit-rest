import { Collection } from 'mongodb';
import { TestDocument } from './TestDocument';

export interface TestCollections {
    test: Collection<TestDocument>;
}
