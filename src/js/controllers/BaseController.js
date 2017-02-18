'use strict';

import Container from '../framework/Container';

export default class BaseController {

    render(page) {
        return ([
            '<div id="grid">',
            ... Container.getService('header').render(),
            ... page === undefined ? [] : page,
            '</div>'
        ]);
    }
}
