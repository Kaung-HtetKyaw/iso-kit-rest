import { SocketEventHandler, SocketType } from '../types';

export const onConnection: SocketEventHandler<void> = context => {
    console.log('User Connected');
};
