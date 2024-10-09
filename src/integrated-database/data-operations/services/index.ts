import { AppModels } from '../getModels';
import createEmployeeService, { EmployeeModels, EmployeeOperations } from './employees';

export interface Models extends EmployeeModels {}

export interface Operations extends EmployeeOperations {}

export type ServiceBuilder = (appModels: AppModels) => {
    models: Partial<Models>;
    operations: Partial<Operations>;
};

const services: { [serviceName: string]: ServiceBuilder } = {
    employee: createEmployeeService,
};

export default services;
