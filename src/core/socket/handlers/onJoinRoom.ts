import { SocketEventHandler, SocketType } from '../types';

export const onJoinRoom: SocketEventHandler<() => void> =
    ({ context }) =>
    () => {
        console.log('User Join Room');

        // TODO: implementation details
    };
