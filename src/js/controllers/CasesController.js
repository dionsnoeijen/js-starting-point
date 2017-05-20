'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import Container from '../framework/Container';

export default class CasesController extends BaseController {

    constructor() {
        super();
        addObservable(this);
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
            '<div id="' + this.constructor.getId() + '" class="ready">',
                '<div class="content">',
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
                '</div>',
            '</div>'
        ]);
    }

    events() {
        let cases = document.querySelectorAll('#' + this.constructor.getId() + ' > .content > ul > li > a');
        Array.from(cases).map(link => {
            link.removeEventListener('click', this.onCaseClick.bind(this));
            link.addEventListener('click', this.onCaseClick.bind(this));
        });
    }

    onCaseClick(event) {
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }

}
