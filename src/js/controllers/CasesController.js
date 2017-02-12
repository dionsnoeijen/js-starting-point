'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';
import { ON_CASES_CONSTRUCTED } from '../config/actions';

export default class CasesController extends BaseController {

    constructor(router, header) {
        super(router, header);
    }

    static create(router, header) {
        let cases = new CasesController(router, header);
        addObservable(cases);
        dispatch({
            listener: ON_CASES_CONSTRUCTED,
            data: {
                casesCreated: true
            }
        });
        return cases;
    }

    [ON_CASES_CONSTRUCTED](e) {

    }

    static getId() {
        return 'cases';
    }

    getCases() {
        return ([
            {
                name: 'Case 1',
                href: I18n.getRoute('case', 'case-1')
            },
            {
                name: 'Case 2',
                href: I18n.getRoute('case', 'case-2')
            },
            {
                name: 'Case 3',
                href: I18n.getRoute('case', 'case-3')
            }
        ]);
    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
            '<hr />',
            '<ul>',
            ... this.getCases().map(element => {
                return ([
                    '<li>',
                    '<a href="' + element.href +'">',
                    element.name,
                    '</a>',
                    '</li>'
                ].join(''));
            }),
            '</ul>',
            '</div>'
        ]);
    }

    events() {
        let cases = document.querySelectorAll('#' + this.constructor.getId() + ' > ul > li > a');
        Array.from(cases).map(link => {
            link.removeEventListener('click', this.onCaseClick.bind(this));
            link.addEventListener('click', this.onCaseClick.bind(this));
        });
    }

    onCaseClick(event) {
        event.preventDefault();
        let target = event.target;
        this.router.navigate(target.getAttribute('href'), true);
    }

}
