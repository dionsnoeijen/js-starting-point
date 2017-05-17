'use strict';

import BaseController from '../controllers/BaseController';
import { addObservable } from '../framework/State';

export default class ContactController extends BaseController{

    constructor() {
        super();
        addObservable(this);
    }

    static getId() {
        return 'contact';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
                '<p>Contact</p>',
            '</div>'
        ]);
    }
}
