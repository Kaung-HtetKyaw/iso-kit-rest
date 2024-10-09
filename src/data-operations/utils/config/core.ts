import { getString, getNumber, getBoolean } from '../../../core/env';

export const DEFAULT_CONNECTION_STRING = getString('DEFAULT_CONNECTION_STRING', 'mongodb+srv://localhost:27017');

export const DEFAULT_DATABASE = getString('DEFAULT_DATABASE', 'afc');

export const DEFAULT_CONNECTION_POOL = getNumber('DEFAULT_CONNECTION_POOL', 10);

export const MIGRATION_CONNECTION_STRING = getString('MIGRATION_CONNECTION_STRING', DEFAULT_CONNECTION_STRING);

export const MIGRATION_DATABASE = getString('MIGRATION_DATABASE', DEFAULT_DATABASE);

export const DATA_CRYPT_ENABLED = getBoolean('DATA_CRYPT_ENABLED', false);

export const DATA_CRYPT_KEY = getString('DATA_CRYPT_KEY');

export const DATA_CRYPT_IV = getString('DATA_CRYPT_IV');
