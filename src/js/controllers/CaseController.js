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
        this.slidesClick = this.onSlidesClick.bind(this);
    }

    [SET_PARAMETERS](parameters) {
        this.parameters = parameters.parameters;
    }

    static getId() {
        return 'case';
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '" class="ready ' + this.parameters.slug + '">',
                '<div class="content">',
                    '<p>Case ' + this.parameters.slug + ' <a href="' + I18n.getRoute('case.slides', this.parameters.slug) + '">Slides</a></p>',
                '</div>',
            '</div>'
        ]);
    }

    events() {
        let slideLinks = document.querySelectorAll('.' + this.parameters.slug + ' > .content > p > a');

        Array.from(slideLinks).map(link => {
            link.removeEventListener('click', this.slidesClick);
            link.addEventListener('click', this.slidesClick);
        });
    }

    onSlidesClick(event) {
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }
}
