'use strict';

import BaseController from '../controllers/BaseController';
import { dispatch, addObservable } from '../helpers/State';
import { ON_CONTACT_CONSTRUCTED } from '../config/actions';

export default class ContactController extends BaseController{

    constructor(router, header) {
        super(router, header);
    }

    static create(router, header) {
        let contact = new ContactController(router);
        addObservable(contact);
        dispatch({
            listener: ON_CONTACT_CONSTRUCTED,
            data: {
                homeCreated: true
            }
        });
        return contact;
    }

    [ON_CONTACT_CONSTRUCTED](e) {
        
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
