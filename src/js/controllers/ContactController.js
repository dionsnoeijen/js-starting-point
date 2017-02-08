'use strict';

import BaseController from '../controllers/BaseController';

export default class ContactController extends BaseController{

    constructor(i18n, router) {
        super(i18n, router);

        console.log(i18n.getTranslation('contact'));
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
