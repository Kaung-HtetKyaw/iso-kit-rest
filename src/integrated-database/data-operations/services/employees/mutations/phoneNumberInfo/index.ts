import { AppModels } from '../../../../getModels';
import { createOperationsFactory, OperationFn } from '../../../../utils/operationsFactory';
import createPhoneNumberInfo, { CreatePhoneNumberInfo } from './createPhoneNumberInfo';

export interface PhoneNumberInfoMutations {
    createPhoneNumberInfo: OperationFn<CreatePhoneNumberInfo>;
}

const createOperations = createOperationsFactory((models: AppModels) => ({
    createPhoneNumberInfo: createPhoneNumberInfo(models),
}));

export default createOperations;
