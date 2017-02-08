'use strict';

import { NL, EN } from '../config/config';

export default class LanguageNavigation {

    constructor(i18n, router) {
        this.i18n = i18n;
        this.router = router;
    }

    static getId() {
        return 'lang-nav';
    }

    render() {
        return ([
            '<ul id="' + this.constructor.getId() + '">',
                '<li><a href="'+ this.i18n.getRoute('home', null, NL) +'">' + this.i18n.getTranslation('lang', NL) + '</a></li>',
                '<li><a href="'+ this.i18n.getRoute('home', null, EN) +'">' + this.i18n.getTranslation('lang', EN) + '</a>',
            '</ul>'
        ]);
    }

    events() {
        let menu = document.querySelectorAll('ul#' + this.constructor.getId() + ' > li > a');
        Array.from(menu).map(link => {
            link.removeEventListener('click', this.onMenuClick.bind(this));
            link.addEventListener('click', this.onMenuClick.bind(this));
        });
    }

    onMenuClick(event) {
        event.preventDefault();
        let target = event.target;
        this.router.navigate(target.getAttribute('href'), true);
    }
}
