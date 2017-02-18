'use strict';

import BaseController from './BaseController';
import { addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import { SET_PARAMETERS } from '../config/actions';
import Container from '../framework/Container';

export default class CaseController extends BaseController {

    constructor() {
        super();
        addObservable(this);
    }

    [SET_PARAMETERS](parameters) {
        this.parameters = parameters.parameters;
    }

    render() {
        return super.render([
            '<div id="' + this.parameters.slug + '">',
                '<hr />',
                '<p>Case ' + this.parameters.slug + ' <a href="' + I18n.getRoute('case.slides', this.parameters.slug) + '">Slides</a></p>',
            '</div>'
        ]);
    }

    events() {
        let slideLinks = document.querySelectorAll('#' + this.parameters.slug + ' > p > a');
        Array.from(slideLinks).map(link => {
            link.removeEventListener('click', this.onSlidesClick.bind(this));
            link.addEventListener('click', this.onSlidesClick.bind(this));
        });
    }

    onSlidesClick(event) {
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }
}
