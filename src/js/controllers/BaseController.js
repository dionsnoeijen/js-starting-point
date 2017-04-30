'use strict';

import Container from '../framework/Container';

export default class BaseController {

    render(page) {
        return ([
            '<div id="container">',
                '<div id="container_nav">',
                ... Container.getService('navigation').render(),
                ... Container.getService('language_navigation').render(),
                '</div>',
                '<div id="grid">',
                ... Container.getService('header').render(),
                ... page === undefined ? [] : page,
                '</div>',
            '</div>'
        ]);
    }
}
