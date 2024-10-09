import config from '../../../core/config';
import { getStringArray, StringStore, getString, NumberStore, getNumber } from '../../../core/env';
import services from '../../services';

export const SERVICES = getStringArray('SERVICES', Object.keys(services));

export const SERVICES_CONNECTION_STRING: StringStore = Object.fromEntries(
    Object.keys(services).map(service => [
        service,
        getString(`${service.toUpperCase()}_CONNECTION_STRING`, config.db.uri),
    ])
);

export const SERVICES_DATABASE: StringStore = Object.fromEntries(
    Object.keys(services).map(service => [service, getString(`${service.toUpperCase()}_DATABASE`, config.db.name)])
);

export const SERVICES_CONNECTION_POOL: NumberStore = Object.fromEntries(
    Object.keys(services).map(service => [
        service,
        getNumber(`${service.toUpperCase()}_CONNECTION_POOL`, config.db.pool),
    ])
);

export * from './core';
