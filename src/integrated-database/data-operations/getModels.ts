import { DatabaseContext } from '../../database/instance';
import { PhoneNumberInfoModel } from './services/employees/models';

const modelGetters = [PhoneNumberInfoModel];

export const getModels = async ({ integrated }: Pick<DatabaseContext, 'integrated'>) => {
    const models = modelGetters.map(model => model.init(integrated.client));

    await Promise.all(models.map(el => el.sync({ alter: false })));

    return {
        phoneNumberInfo: PhoneNumberInfoModel.PhoneNumberInfo,
    };
};

export type AppModels = Awaited<ReturnType<typeof getModels>>;
