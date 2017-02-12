'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';
import { ON_CASE_CONSTRUCTED } from '../config/actions';

export default class CaseController extends BaseController {

    constructor(router, header, parameters) {
        super(router, header);
        this.parameters = parameters.parameters;
    }

    static create(router, header, parameters) {
        let oneCase = new CaseController(router, header, parameters);
        addObservable(oneCase);
        dispatch({
            listener: ON_CASE_CONSTRUCTED,
            data: {
                [oneCase.parameters.slug + '-created']: true
            }
        });
        return oneCase;
    }

    [ON_CASE_CONSTRUCTED](e) {

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
