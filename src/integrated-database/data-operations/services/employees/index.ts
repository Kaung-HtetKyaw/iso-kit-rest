import { Sequelize } from 'sequelize';
import { createQueries } from './queries';
import { AppModels } from '../../getModels';
import { createOperations, EmployeeMutations } from './mutations';
import { PhoneNumberInfoQueries } from './queries/phoneNumberInfo';
import { PhoneNumberInfoType, PhoneNumberInfo } from './models/PhoneNumberInfo';

export interface EmployeeOperations extends EmployeeMutations, PhoneNumberInfoQueries {}

export type EmployeeModels = {
    phoneNumberInfo: PhoneNumberInfoType;
};

export interface EmployeeService {
    models: EmployeeModels;
    operations: EmployeeOperations;
}

const createEmployeeService = (appModels: AppModels): EmployeeService => {
    const models = {
        phoneNumberInfo: PhoneNumberInfo,
    };

    return {
        models,
        operations: {
            ...createQueries(appModels),
            ...createOperations(appModels),
        },
    };
};

export default createEmployeeService;
