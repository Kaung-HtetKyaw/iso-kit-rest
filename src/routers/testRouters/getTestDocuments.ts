import { HandlerContext, RouteEndpointHandler } from '..';

export const getTestDocuments: RouteEndpointHandler<{}, {}, {}, {}> =
    (context: HandlerContext) => async (req, res, next) => {
        const { operations } = context;

        const data = await operations.regular.getTestDocuments();

        res.status(200).json({ data });
    };
