'use strict';

import { addObservable } from '../framework/State';
import Container from '../framework/Container';

export default class HomeController {

    constructor() {
        addObservable(this);
    }

    static getId() {
        return 'home';
    }

    render() {
        return ([
            '<div id="container">',
                '<div id="container_nav">',
                ... Container.getService('navigation').render(),
                ... Container.getService('language_navigation').render(),
                '</div>',
                '<div id="grid">',
                ... Container.getService('header').render(),
                '</div>',
                ... Container.getService('home_slider').render(),
            '</div>'
        ]);
    }
}
