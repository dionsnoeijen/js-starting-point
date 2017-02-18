'use strict';

import BaseController from '../controllers/BaseController';
import { addObservable } from '../framework/State';

export default class AboutController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    static getId() {
        return 'about';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() +'">',
            '<hr />',
            '<p>ABOUT</p>',
            '</div>'
        ]);
    }
}
