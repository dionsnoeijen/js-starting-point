'use strict';

import Container from '../framework/Container';
import { dispatch } from '../framework/State';

export default class BaseController {

    render(page) {
        dispatch({
            data: {
                activePage: this.constructor.getId()
            }
        });
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

    animateIn(callback) {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('out');
        element.classList.add('in');
        if (callback !== undefined) {
            setTimeout(() => {
                callback(this.constructor.getId());
            }, 500);
        }
    }

    animateOut(callback) {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('in');
        element.classList.add('out');
        if (callback !== undefined) {
            setTimeout(() => {
                callback(this.constructor.getId());
            }, 500);
        }
    }
}
