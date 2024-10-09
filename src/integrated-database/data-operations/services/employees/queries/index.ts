import { AppModels } from '../../../getModels';
import createPhoneNumberInfoQueries from './phoneNumberInfo';

export const createQueries = (models: AppModels) => ({
    ...createPhoneNumberInfoQueries(models),
});
