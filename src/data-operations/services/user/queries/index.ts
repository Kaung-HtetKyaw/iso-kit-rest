import { UserCollections } from '../documents';
import getUsers, { GetUsers } from './getUsers';

export interface UserQueries {
    getUsers: GetUsers;
}

export const createQueries = (collections: UserCollections): UserQueries => ({
    getUsers: getUsers(collections),
});
