import { HandlerContext, RouteEndpointHandler } from '..';

export const createTest: RouteEndpointHandler<{}, {}, {}, {}> = (context: HandlerContext) => async (req, res, next) => {
    const { operations } = context;

    const data = await operations.regular.createTest({ name: 'Hello World' });

    res.status(200).json({ data });
};
