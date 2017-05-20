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
        this.closeClick = this.onCloseClick.bind(this);
    }

    [SET_PARAMETERS](parameters) {
        this.parameters = parameters.parameters;
    }

    static getId() {
        return 'case-slides';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '" class="ready ' + this.parameters.slug + '-slides">',
                '<div class="content">',
                    '<ul>',
                        '<li>Slide 1</li>',
                        '<li>Slide 2</li>',
                    '</ul>',
                    '<a id="close" href="' + I18n.getRoute('case', this.parameters.slug) + '">Close</a>',
                '</div>',
            '</div>'
        ]);
    }

    events() {
        let close = document.querySelector('#close');
        close.removeEventListener('click', this.closeClick);
        close.addEventListener('click', this.closeClick);
    }

    onCloseClick(event) {
        console.log('ON CLOSE CLICK');
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }
}
