'use strict';

export default class Container {

    static getService(key) {
        if (window.service === undefined) {
            throw new Error('Set services first');
        }
        if (window.service[key] !== undefined) {
            return window.service[key];
        }
        throw new Error('The service you requested does not exist');
    }

    static getServices() {
        return window.service;
    }
};
