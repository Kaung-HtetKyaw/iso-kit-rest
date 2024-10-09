import { AppModels } from '../../../../getModels';
import { PhoneNumberInfoInput } from '../../documents';
import { PhoneNumberInfo } from '../../models/PhoneNumberInfo';

export type CreatePhoneNumberInfo = (data: PhoneNumberInfoInput) => Promise<PhoneNumberInfo>;

const createPhoneNumberInfo =
    (models: AppModels): CreatePhoneNumberInfo =>
    async (data: PhoneNumberInfoInput) => {
        const document: PhoneNumberInfoInput = {
            ...data,
        };

        return models.phoneNumberInfo.create(document);
    };

export default createPhoneNumberInfo;
