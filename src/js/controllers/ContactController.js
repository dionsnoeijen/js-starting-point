'use strict';

import BaseController from '../controllers/BaseController';

export default class ContactController extends BaseController{

    constructor(i18n, router) {

        super(i18n, router);

        console.log(i18n.getTranslation('contact'));
    }

    render() {
        return super.render([
            '<div>',
            'Contact',
            '</div>'
        ]);
    }
}
