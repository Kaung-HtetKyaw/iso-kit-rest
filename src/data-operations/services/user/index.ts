import { Db } from 'mongodb';
import { USER } from '../../utils/collections';
import { UserCollections, UserDocument } from './documents';
import { createMutations, UserMutations } from './mutations';
import { createQueries, UserQueries } from './queries';

export type { UserCollections };

export interface UserOperations extends UserQueries, UserMutations {}

export interface UserService {
    collections: UserCollections;
    operations: UserOperations;
}

const createUserService = (db: Db): UserService => {
    const collections: UserCollections = {
        users: db.collection<UserDocument>(USER),
    };

    return {
        collections,
        operations: {
            ...createQueries(collections),
            ...createMutations(collections),
        },
    };
};

export default createUserService;
