'use strict';

import BaseController from './BaseController';
import { addObservable } from '../framework/State';

export default class NotFoundController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    static getId() {
        return 'notfound';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
            '<p>Oops 404 Not Found</p>',
            '</div>'
        ]);
    }
}
