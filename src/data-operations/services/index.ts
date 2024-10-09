import { Db } from 'mongodb';
import createTestService, { TestCollections, TestOperations } from './test';
import { UserCollections } from './user/documents';
import createUserService, { UserOperations } from './user';
import createMessageService, { MessageCollections, MessageOperations } from './message';

export interface Collections extends UserCollections, MessageCollections, TestCollections {}

export interface Operations extends UserOperations, MessageOperations, TestOperations {}

export type ServiceBuilder = (db: Db) => {
    collections: Partial<Collections>;
    operations: Partial<Operations>;
};

const services: { [serviceName: string]: ServiceBuilder } = {
    user: createUserService,
    message: createMessageService,
    test: createTestService,
};

export const validations = {};

export default services;
