'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';
import { SET_PARAMETERS } from '../config/actions';

export default class CaseController extends BaseController {

    constructor(router, header) {
        super(router, header);
    }

    [SET_PARAMETERS](parameters) {
        this.parameters = parameters.parameters;
    }

    static create(router, header) {
        let oneCase = new CaseController(router, header);
        addObservable(oneCase);
        return oneCase;
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
        this.router.navigate(target.getAttribute('href'), true);
    }
}
