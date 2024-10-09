import { Collections } from '../services';

interface Migration {
    identifier: string;
    up: (collections: Collections) => Promise<void>;
    skipOnTests?: boolean;
}

const migrations: Migration[] = [];

export default migrations;
