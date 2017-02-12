'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from 'helpers/State';

export default class CaseController extends BaseController {

    constructor(i18n, router, parameters) {
        super(i18n, router);
        this.parameters = parameters;
    }

    static create(i18n, router, parameters) {
        let oneCase = new CaseController(i18n, router, parameters);
        addObservable(oneCase);
        dispatch({
            listener: CaseController.ON_CASE_CONSTRUCTED
        });
        return oneCase;
    }

    [CaseController.ON_CASE_CONSTRUCTED](e) {
        console.log('ON CASE CONSTRUCTED', e);
    }

    render() {
        return super.render([
            '<div id="' + this.parameters.slug + '">',
                '<hr />',
                '<p>Case ' + this.parameters.slug + ' <a href="' + this.i18n.getRoute('case.slides', this.parameters.slug) + '">Slides</a></p>',
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

CaseController.ON_CASE_CONSTRUCTED = 'onCaseConstructed';
