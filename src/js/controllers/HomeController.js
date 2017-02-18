'use strict';

import BaseController from './BaseController';
import { addObservable } from '../framework/State';

export default class HomeController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    static getId() {
        return 'home';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
            '<hr />',
            '<p>Home</p>',
            '</div>'
        ]);
    }
}
