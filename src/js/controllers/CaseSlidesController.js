'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from 'helpers/State';

export default class CaseSlidesController extends BaseController {

    constructor(i18n, router, parameters) {
        super(i18n, router);

        this.parameters = parameters;
        console.log(i18n.getTranslation('case.slides'), parameters);
    }

    static create(i18n, router, parameters) {
        let caseSlides = new CaseSlidesController(i18n, router, parameters);
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
                '<a id="close" href="' + this.i18n.getRoute('case', this.parameters.slug) + '">Close</a>',
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
