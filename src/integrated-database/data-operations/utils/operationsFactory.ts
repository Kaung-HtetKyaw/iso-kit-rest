import { Attributes, Model } from 'sequelize';
import { AppModels } from '../getModels';
import { Operations } from '../services';
import * as Sentry from '@sentry/node';

interface CreateOperationsFn<T> {
    (models: AppModels): T;
}

export interface OperationFn<T extends (...args) => Promise<unknown>> {
    (...args: Parameters<T>): Promise<{ data: Awaited<ReturnType<T>>; error: Error }>;
}

export const createOperationsFactory = <
    FN extends CreateOperationsFn<{ [key in keyof Partial<Operations>]: (...args) => Promise<unknown> }>
>(
    createQueriesFn: FN
) => {
    return (models: AppModels) => {
        const queryFns = createQueriesFn(models);

        return Object.entries(queryFns).reduce((acc, cur) => {
            const [key, fn] = cur;

            return {
                ...acc,
                [key]: (...args) =>
                    fn(...args)
                        .then(res => {
                            // @ts-ignore
                            return { data: res?.dataValues ? { ...res.dataValues, id: res.id } : res };
                        })
                        .catch(err => {
                            console.error(err);
                            Sentry.captureException(err);
                            return { data: null, error: err };
                        }),
            };
        }, {} as ReturnType<CreateOperationsFn<{ [key in keyof Operations]: OperationFn<(...args) => Promise<unknown>> }>>);
    };
};
