import { Router, Request } from 'express';
import { RouterHander } from '..';
import { getTestDocuments } from './getTestDocuments';
import { createTest } from './createTest';

const testRouter: RouterHander = ({ operations }): Router => {
    const router = Router();

    router.get('/', getTestDocuments({ operations }));
    router.post('/', createTest({ operations }));

    return router;
};

export default testRouter;
