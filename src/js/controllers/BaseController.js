'use strict';

import Header from '../components/Header';

export default class BaseController {

    constructor(i18n, router) {
        this.i18n = i18n;
        this.router = router;
        this.header = new Header(this.i18n, this.router);
    }

    render(page) {
        return ([
            '<div id="grid">',
            ... this.header.render(),
            ... page === undefined ? [] : page,
            '</div>'
        ]);
    }
}
