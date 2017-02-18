'use strict';

import { NL, EN } from '../config/config';
import { dispatch, addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import Container from '../framework/Container';

export default class LanguageNavigation {

    constructor() {
        addObservable(this);
        dispatch({
            data: {
                languageNavigationInitialized: true
            }
        });
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
        Container.getService('router').navigate(target.getAttribute('href'), true);
    }
}
