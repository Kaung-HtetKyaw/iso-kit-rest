import { ObjectId } from 'mongodb';
import { UserCollections, UserDocument } from '../documents';

export type UpdateUserPassword = (id: ObjectId, password: string) => Promise<UserDocument | null>;

export const updateUserPassword =
    (collections: UserCollections): UpdateUserPassword =>
    async (id, password) => {
        // first get the user we want to update
        const user = await collections.users.findOne({ _id: id });

        if (!user) {
            // the user does not exist
            return null;
        }

        // then update
        const document = await collections.users.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    passwordHistory: {
                        password: user.password,
                        replacedAt: new Date(),
                    },
                },
                $set: { password },
            },
            { returnDocument: 'after' }
        );

        return document?.value;
    };

export default updateUserPassword;
