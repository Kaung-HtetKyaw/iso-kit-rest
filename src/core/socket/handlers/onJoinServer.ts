import { EventTypes } from '../keys';
import { SocketEventHandler, SocketType } from '../types';

let users = [];

export const onJoinServer: SocketEventHandler<(data: any) => void> =
    ({ socket, context, io }) =>
    () => {
        // TODO: mark user as active when join

        // TODO: get all users for this server
        let user = {
            phoneNumber: context.phoneNumberInfo.display_phone_number,
            id: socket.id,
        };

        // @ts-ignore
        if (!users.find(el => el.phoneNumber === context.phoneNumberInfo.display_phone_number)) {
            users.push(user);
        }

        console.log(users);
        io.emit(EventTypes['new-user'], users);
    };
