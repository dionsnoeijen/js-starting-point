'use strict';

import Navigation from './Navigation';

export default class Header {

    constructor(i18n) {
        this.navigation = new Navigation(i18n);
    }

    render() {
        return ([
            '<header>',
            ... this.navigation.render(),
            '</header>'
        ]);
    }

}
