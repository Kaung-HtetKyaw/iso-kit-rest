import { Collection } from 'mongodb';
import { MessageDocument } from './MessageDocument';

export interface MessageCollections {
    messages: Collection<MessageDocument>;
}
