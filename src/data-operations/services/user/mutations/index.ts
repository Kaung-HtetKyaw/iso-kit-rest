import { UserCollections } from '../documents';
import createUser, { CreateUser } from './createUser';
import updateUserPassword, { UpdateUserPassword } from './updateUserPassword';

export interface UserMutations {
    createUser: CreateUser;
    updateUserPassword: UpdateUserPassword;
}

export const createMutations = (collections: UserCollections): UserMutations => ({
    createUser: createUser(collections),
    updateUserPassword: updateUserPassword(collections),
});
