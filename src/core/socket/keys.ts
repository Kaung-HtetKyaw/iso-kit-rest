export const EventTypes = {
    setup: 'setup',
    'join-server': 'join-server',
    'join-room': 'join-room',
    'user-active': 'user-active',
    connection: 'connection',
    'send-message': 'send-message',
    'new-message': 'new-message',
    'new-user': 'new-user',
    'message-received': 'message-received',
    disconnect: 'disconnect',
    'disconnected-user': 'disconnected-user',
    'new-received-message': 'new-received-message',
} as const;

export type EventTypesEnum = keyof typeof EventTypes;
