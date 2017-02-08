'use strict';

import Navigation from './Navigation';

export default class Header {

    constructor(i18n, router) {
        this.i18n = i18n;
        this.ID = 'header-' + this.i18n.determineLanguage();
        this.navigation = new Navigation(i18n, router);
    }

    render() {
        return ([
            '<header id="' + this.ID + '">',
            ... this.navigation.render(),
            '</header>'
        ]);
    }

}
