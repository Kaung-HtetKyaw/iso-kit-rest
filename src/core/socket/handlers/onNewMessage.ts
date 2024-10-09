import { EventTypes } from '../keys';
import { SocketEventHandler, SocketType } from '../types';

export const onNewMessage: SocketEventHandler<(data: any) => void> =
    ({ socket }) =>
    newMessageRec => {
        const chat = newMessageRec.chat;
        if (!chat.users) return console.log('chat user not defined');

        chat.users.forEach(user => {
            if (user != newMessageRec.sender._id) {
                socket.in(user).emit(EventTypes['message-received'], newMessageRec);
            }
        });
    };
