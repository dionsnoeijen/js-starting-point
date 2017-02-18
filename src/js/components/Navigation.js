'use strict';

import { dispatch, addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import Container from '../framework/Container';

export default class Navigation {

    constructor() {
        addObservable(this);
        dispatch({
            data: {
                navigationInitialized: true
            }
        });
    }

    static getId() {
        return 'navigation';
    }

    getActive() {
        let locations = window.location.pathname.split('/');
        if (locations[2] === undefined) {
            return I18n.getTranslation('home.page.id');
        }
        return locations[2];
    }

    getNavigationElements() {
        return ([
            {
                name: I18n.getTranslation('home'),
                href: I18n.getRoute('home'),
                key: this.constructor.getId() + '-' + I18n.getTranslation('home.page.id')
            },
            {
                name: I18n.getTranslation('cases'),
                href: I18n.getRoute('cases'),
                key: this.constructor.getId() + '-' + I18n.getTranslation('cases.page.id')
            },
            {
                name: I18n.getTranslation('about'),
                href: I18n.getRoute('about'),
                key: this.constructor.getId() + '-' + I18n.getTranslation('about.page.id')
            },
            {
                name: I18n.getTranslation('contact'),
                href: I18n.getRoute('contact'),
                key: this.constructor.getId() + '-' + I18n.getTranslation('contact.page.id')
            }
        ]);
    }

    render() {
        return ([
            '<nav id="' + this.constructor.getId() + '-' + I18n.determineLanguage() + '">',
                '<ul>',
                ... this.getNavigationElements().map(element => {
                    return ([
                        '<li>',
                            '<a id="' + element.key + '" href="' + element.href + '">',
                            element.name,
                            '</a>',
                        '</li>'
                    ].join(''));
                }),
                '</ul>',
            '</nav>'
        ]);
    }

    events() {
        let menu = document.querySelectorAll("nav > ul > li > a");
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

    setActive() {
        let active = this.constructor.getId() + '-' + this.getActive();
        let menu = document.querySelectorAll("nav > ul > li > a");
        Array.from(menu).map(link => {
            link.className = "";
        });
        document.getElementById(active).className += "active";
    }
}
