'use strict';

import { NL, EN } from '../config/config';
import { ON_LANGUAGE_NAVIGATION_CREATED } from '../config/actions';
import { dispatch, addObservable } from 'helpers/State';
import I18n from '../helpers/i18n';

export default class LanguageNavigation {

    constructor(router) {
        this.router = router;
    }

    static create(router) {
        let languageNavigation = new LanguageNavigation(router);
        addObservable(languageNavigation);
        dispatch({
            listener: ON_LANGUAGE_NAVIGATION_CREATED,
            data: {
                languageNavigationInitialized: true
            }
        });
        return languageNavigation;
    }

    [ON_LANGUAGE_NAVIGATION_CREATED](e) {

    }

    static getId() {
        return 'lang-nav';
    }

    render() {
        return ([
            '<ul id="' + this.constructor.getId() + '">',
                '<li><a href="'+ I18n.getRoute('home', null, NL) +'">' + I18n.getTranslation('lang', NL) + '</a></li>',
                '<li><a href="'+ I18n.getRoute('home', null, EN) +'">' + I18n.getTranslation('lang', EN) + '</a>',
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