import { IncomingMessage } from 'http';
import { Socket, Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserContext } from '../../middlewares/auth';
import { HandlerContext } from '../../routers';

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> & {
    request: IncomingMessage & { context: UserContext };
};

export type SocketContext = {
    socket: SocketType;
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    context: UserContext;
} & HandlerContext;

export type SocketEventHandler<T> = (context: SocketContext) => T;

export const RecipientTypes = { individual: 'individual', group: 'group' } as const;
export type RecipientTypesEnum = keyof typeof RecipientTypes;
