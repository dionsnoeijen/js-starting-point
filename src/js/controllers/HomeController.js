'use strict';

import BaseController from './BaseController';

export default class HomeController extends BaseController {

    constructor(i18n, router) {
        super(i18n, router);
        console.log(this.i18n.getTranslation('home'));
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
