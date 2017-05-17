'use strict';

import BaseController from '../controllers/BaseController';
import { dispatch, addObservable } from '../framework/State';
import Container from '../framework/Container';

// var supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;

export default class HomeController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    static getId() {
        return 'home';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '" class="ready">',
            ... Container.getService('home_slider_controls').render(),
            ... Container.getService('home_color_layer').render(),
            ... Container.getService('hexagon_home_pattern').render(),
            ... Container.getService('home_slider').render(),
            '</div>'
        ]);
    }

    events() {
        Container.getService('home_slider_controls').events();
    }

    animateIn(callback) {

        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('out');
        element.classList.add('in');

        Container.getService('home_slider').animateIn();

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

        Container.getService('home_slider').animateOut();

        if (callback !== undefined) {
            setTimeout(() => {
                callback(this.constructor.getId());
            }, 500);
        }
    }
}
