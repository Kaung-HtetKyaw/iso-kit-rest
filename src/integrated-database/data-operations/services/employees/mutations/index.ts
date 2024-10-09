import { AppModels } from '../../../getModels';
import createEmployeeOperations, { PhoneNumberInfoMutations } from './phoneNumberInfo';

export interface EmployeeMutations extends PhoneNumberInfoMutations {}

export const createOperations = (models: AppModels): EmployeeMutations => ({
    ...createEmployeeOperations(models),
});
