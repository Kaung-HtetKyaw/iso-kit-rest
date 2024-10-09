import { FindCursor, RootFilterOperators } from 'mongodb';
import { UserCollections, UserDocument } from '../documents';

export type GetUserByEmail = (filter: RootFilterOperators<UserDocument>) => FindCursor<UserDocument>;

const getUserByEmail =
    (collections: UserCollections): GetUserByEmail =>
    filter =>
        collections.users.find(filter);

export default getUserByEmail;
