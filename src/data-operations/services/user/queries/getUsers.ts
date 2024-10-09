import { FindCursor, RootFilterOperators } from 'mongodb';
import { UserCollections, UserDocument } from '../documents';

export type GetUsers = (filter: RootFilterOperators<UserDocument>) => FindCursor<UserDocument>;

const getUsers =
    (collections: UserCollections): GetUsers =>
    filter =>
        collections.users.find(filter);

export default getUsers;
