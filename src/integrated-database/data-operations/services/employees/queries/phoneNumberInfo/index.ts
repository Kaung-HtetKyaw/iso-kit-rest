import { AppModels } from '../../../../getModels';
import { createOperationsFactory, OperationFn } from '../../../../utils/operationsFactory';
import getPhoneNumberInfoById, { GetPhoneNumberInfoById } from './getPhoneNumberInfoById';

export interface PhoneNumberInfoQueries {
    getPhoneNumberInfoById: OperationFn<GetPhoneNumberInfoById>;
}

const createQueries = createOperationsFactory((models: AppModels) => ({
    getPhoneNumberInfoById: getPhoneNumberInfoById(models),
}));

export default createQueries;
