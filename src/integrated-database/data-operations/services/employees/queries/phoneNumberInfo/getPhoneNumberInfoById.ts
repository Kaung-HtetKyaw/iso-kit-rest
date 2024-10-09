import { AppModels } from '../../../../getModels';
import { PhoneNumberInfoAttributes } from '../../documents';

export type GetGetPhoneNumberInfoByIdQueryOptions = { id: string };
export type GetPhoneNumberInfoById = (
    queryOptions: GetGetPhoneNumberInfoByIdQueryOptions
) => Promise<PhoneNumberInfoAttributes>;

const getPhoneNumberInfoById =
    (models: AppModels): GetPhoneNumberInfoById =>
    async queryOptions =>
        models.phoneNumberInfo.findOne({ where: { person_id: queryOptions.id } });

export default getPhoneNumberInfoById;
