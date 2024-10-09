import { getStringArray } from '../../../../core/env';
import services from '../../services';

export const SERVICES = getStringArray('SERVICES', Object.keys(services));
