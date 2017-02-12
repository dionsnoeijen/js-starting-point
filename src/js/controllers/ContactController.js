'use strict';

import BaseController from '../controllers/BaseController';
import { dispatch, addObservable } from 'helpers/State';

export default class ContactController extends BaseController{

    constructor(i18n, router) {
        super(i18n, router);
    }

    static create(i18n, router) {
        let contact = new ContactController(i18n, router);
        addObservable(contact);
        return contact;
    }

    static getId() {
        return 'contact';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
                '<hr />',
                '<p>Contact</p>',
            '</div>'
        ]);
    }
}
