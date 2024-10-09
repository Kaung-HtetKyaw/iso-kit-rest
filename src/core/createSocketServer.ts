import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { onNewMessage, onJoinServer, onConnection, EventTypes, SocketType } from './socket';
import config from './config';
import { onJoinRoom } from './socket/handlers/onJoinRoom';
import { onSendMessage } from './socket/handlers/onSendMessage';
import { HandlerContext } from '../routers';

export const createSocketServer = ({
    server,
    context,
}: {
    server: HttpServer;
    context: Omit<HandlerContext, 'io'>;
}) => {
    const io = new SocketServer(server, {
        cors: {
            origin: config.socketClient,
            methods: ['GET', 'POST'],
        },
    });

    io.use(async (socket: SocketType, next) => {
        // const payload = await verifyJwtToken()
        console.log('TOKEN:   ');
        console.log(socket.handshake.auth.token);
        if (!socket.handshake.auth.token) {
            return next(new Error('Token not present in the handshake'));
        }

        // TODO: later the token will be JWT and we need to verify and get the payload out of it
        const data = await context.operations.integrated.getPhoneNumberInfoById({ id: socket.handshake.auth.token });
        console.log(data);
        // attach phone number context to request object
        socket.request.context = { phoneNumberInfo: data.data };

        next();
    });

    io.on(EventTypes.connection, (socket: SocketType) => {
        const socketContext = { socket, io, context: socket.request.context, ...context };
        onConnection(socketContext);

        socket.on(EventTypes['join-server'], onJoinServer(socketContext));

        socket.on(EventTypes['send-message'], onSendMessage(socketContext));

        socket.on(EventTypes['new-message'], onNewMessage(socketContext));

        socket.on(EventTypes['join-room'], onJoinRoom(socketContext));

        socket.on(EventTypes.disconnect, (id: string) => {
            io.emit(EventTypes['disconnected-user'], id);
        });
    });

    return io;
};
