import { ObjectId } from 'mongodb';
import { DocumentList } from '../../sharedTypes';
import { SimpleVersionSchema } from '../../sharedDocuments';
import { z } from 'zod';

export enum ViewDataType {
    SINGLE = 'SINGLE',
    DOWNLINE = 'DOWNLINE',
}

export type UserCountry = {
    countryId: ObjectId;
    roleId: ObjectId;
    superiorId?: ObjectId | null;
    isParallelView: boolean;
    viewData: ViewDataType;
    dealerIds: ObjectId[];
};

export type UserPasswordHistory = {
    password: string;
    replacedAt: Date;
};

export const UserSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    isSuperUser: z.boolean().default(false),
    password: z.string(),
    isActive: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
    version: SimpleVersionSchema,
});

export type UserDocument = z.infer<typeof UserSchema>;

export type UserDocumentList = DocumentList<UserDocument>;
