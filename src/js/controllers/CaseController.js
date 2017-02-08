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
                '<p>Case ' + this.parameters.slug + ' <a href="/nl/project/' + this.parameters.slug + '/afbeeldingen">Slides</a></p>',
            '</div>'
        ]);
    }

    events() {
        let slideLinks = document.querySelectorAll('#' + this.parameters.slug + ' > a');
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
