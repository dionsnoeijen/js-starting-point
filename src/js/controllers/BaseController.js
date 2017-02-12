'use strict';

import Header from '../components/Header';

export default class BaseController {

    constructor(router, header) {
        this.router = router;
        this.header = header;
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
