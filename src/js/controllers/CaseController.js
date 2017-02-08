'use strict';

import BaseController from './BaseController';

export default class CaseController extends BaseController {

    constructor(i18n, router, parameters) {
        super(i18n, router);

        this.parameters = parameters;
        console.log(i18n.getTranslation('case'), parameters);
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
