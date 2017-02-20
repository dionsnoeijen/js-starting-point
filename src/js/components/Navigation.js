'use strict';

import { dispatch, addObservable, getState } from '../framework/State';
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

    getNavigation() {
        return [
            {
                name: I18n.getTranslation('home') || 'home',
                href: I18n.getRoute('home') || 'home',
                key: 'navigation-' + (I18n.getTranslation('home.page.id') || 'home')
            },
            {
                name: I18n.getTranslation('cases') || 'cases',
                href: I18n.getRoute('cases') || 'cases',
                key: 'navigation-' + (I18n.getTranslation('cases.page.id') || 'cases')
            },
            {
                name: I18n.getTranslation('about') || 'about',
                href: I18n.getRoute('about') || 'about',
                key: 'navigation-' + (I18n.getTranslation('about.page.id') || 'about')
            },
            {
                name: I18n.getTranslation('contact') || 'contact',
                href: I18n.getRoute('contact') || 'contact',
                key: 'navigation-' + (I18n.getTranslation('contact.page.id') || 'contact')
            }
        ];
    }

    render() {
        return ([
            '<nav id="' + this.constructor.getId() + '-' + I18n.determineLanguage() + '">',
                '<ul>',
                ... this.getNavigation().map(element => {
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
        console.log('ACTIVE', active);
        let element = document.getElementById(active);
        console.log('ELEMENT', element);
        document.getElementById(active).className += "active";
    }
}
