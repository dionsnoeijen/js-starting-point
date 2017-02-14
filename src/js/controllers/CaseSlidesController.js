'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';
import { ON_CASE_SLIDES_CONSTRUCTED } from '../config/actions';

export default class CaseSlidesController extends BaseController {

    constructor(router, header) {
        super(router, header);
    }

    setParameters(parameters) {
        this.parameters = parameters;
    }

    static create(router, header) {
        let caseSlides = new CaseSlidesController(router, header);
        addObservable(caseSlides);
        return caseSlides;
    }

    render() {
        return super.render([
            '<div id="' + this.parameters.slug + '-slides">',
                '<hr />',
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
        this.router.navigate(target.getAttribute('href'), true);
    }
}
