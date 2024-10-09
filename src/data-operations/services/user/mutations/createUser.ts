import { ObjectId } from 'mongodb';
import { UserCollections, UserDocument } from '../documents';

export type CreateUserData = Omit<
    UserDocument,
    '_id' | 'password' | 'passwordResetSecret' | 'passwordHistory' | 'passwordResetExpiresAt' | 'isDeleted'
>;

export type CreateUser = (data: CreateUserData, by?: ObjectId) => Promise<UserDocument>;

const createUser =
    (collections: UserCollections): CreateUser =>
    async (data, by = null) => {
        const createdAt = new Date();

        // create new user document
        const document: UserDocument = {
            _id: new ObjectId(),
            ...data,

            // password is expected to be a hash,
            // having unset will never allows the user to login
            password: 'unset',

            isDeleted: false,
            // create version
            version: {
                createdAt,
                createdBy: by,
                updatedAt: createdAt,
                updatedBy: by,
            },
        };

        // insert it in database
        await collections.users.insertOne(document);

        await collections.users.createIndex({ email: 1 }, { unique: true });

        return document;
    };

export default createUser;
