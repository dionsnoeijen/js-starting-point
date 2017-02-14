'use strict';

import { services } from '../config/services';

export default class Container {
    static getService(key) {
        return services[key];
    }
};
