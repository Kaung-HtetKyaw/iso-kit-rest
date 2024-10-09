import { Collection } from 'mongodb';
import { UserDocument } from './UserDocument';

export interface UserCollections {
    users: Collection<UserDocument>;
}
