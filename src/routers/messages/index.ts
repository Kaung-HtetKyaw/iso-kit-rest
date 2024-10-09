import { Router, Request } from 'express';
import { RouterHander } from '..';
import { getMessagesByParticipants } from './getMessagesByParticipants';

const messagesRouter: RouterHander = ({ operations, io }): Router => {
    const router = Router();

    router.get('/', getMessagesByParticipants({ operations, io }));

    return router;
};

export default messagesRouter;
