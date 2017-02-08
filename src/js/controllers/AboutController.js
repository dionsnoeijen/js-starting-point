'use strict';

import BaseController from '../controllers/BaseController';

export default class AboutController extends BaseController {

    constructor(i18n, router) {
        super(i18n, router);

        console.log(i18n.getTranslation('about'));
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
