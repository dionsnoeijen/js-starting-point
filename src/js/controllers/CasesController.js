'use strict';

import BaseController from './BaseController';

export default class CasesController extends BaseController {

    constructor(i18n, router) {
        super(i18n, router);

        console.log(i18n.getTranslation('cases'));
    }

    static getId() {
        return 'cases';
    }

    getCases() {
        return ([
            {
                name: 'Case 1',
                href: this.i18n.getRoute('case', 'case-1')
            },
            {
                name: 'Case 2',
                href: this.i18n.getRoute('case', 'case-2')
            },
            {
                name: 'Case 3',
                href: this.i18n.getRoute('case', 'case-3')
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
