'use strict';

import BaseController from './BaseController';
import { addObservable } from '../framework/State';
import { SET_PARAMETERS } from '../config/actions';
import I18n from '../framework/I18n';
import Container from '../framework/Container';

export default class CaseSlidesController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    [SET_PARAMETERS](parameters) {
        this.parameters = parameters.parameters;
    }

    static getId() {
        return 'case-slides';
    }

    render() {
        return super.render([
            '<div id="' + this.parameters.slug + '-slides">',
                '<ul>',
                    '<li>Slide 1</li>',
                    '<li>Slide 2</li>',
                '</ul>',
                '<a id="close" href="' + I18n.getRoute('case', this.parameters.slug) + '">Close</a>',
            '</div>'
        ]);
    }

    events() {
        let close = document.querySelector('#close');
        close.removeEventListener('click', this.onCloseClick.bind(this));
        close.addEventListener('click', this.onCloseClick.bind(this));
    }

    onCloseClick(event) {
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }
}
