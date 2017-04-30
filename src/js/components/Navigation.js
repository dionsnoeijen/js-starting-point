'use strict';

import { dispatch, addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import Container from '../framework/Container';
import { ON_OPEN_MENU } from '../config/actions';

export default class Navigation {

    constructor() {
        addObservable(this);
        dispatch({
            data: {
                navigationInitialized: true
            }
        });
        this.menuClick = this.onMenuClick.bind(this);
        this.menuMouseOver = this.onMenuMouseOver.bind(this);
        this.menuMouseLeave = this.onMenuMouseLeave.bind(this);
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
                name: I18n.getTranslation('home'),
                href: I18n.getRoute('home'),
                key: 'navigation-' + I18n.getTranslation('home.page.id')
            },
            {
                name: I18n.getTranslation('cases'),
                href: I18n.getRoute('cases'),
                key: 'navigation-' + I18n.getTranslation('cases.page.id')
            },
            {
                name: I18n.getTranslation('about'),
                href: I18n.getRoute('about'),
                key: 'navigation-' + I18n.getTranslation('about.page.id')
            },
            {
                name: I18n.getTranslation('contact'),
                href: I18n.getRoute('contact'),
                key: 'navigation-' + I18n.getTranslation('contact.page.id')
            }
        ];
    }

    render() {
        return ([
            '<nav id="' + this.constructor.getId() + '-' + I18n.determineLanguage(window.location) + '">',
                '<ul>',
                ... this.getNavigation().map(element => {
                    return ([
                        '<li>',
                            '<div class="hexagon"></div>',
                            '<a id="' + element.key + '" href="' + element.href + '">',
                            element.name,
                            '</a>',
                        '</li>'
                    ].join(''));
                }),
                '</ul>',
            '</nav>',
            ... Container.getService('menu_text').render()
        ]);
    }

    events() {
        let menu = document.querySelectorAll("nav > ul > li > a");
        Array.from(menu).map(link => {
            link.removeEventListener('click', this.menuClick);
            link.addEventListener('click', this.menuClick);
            link.removeEventListener('mouseenter', this.menuMouseOver);
            link.addEventListener('mouseenter', this.menuMouseOver);
            link.removeEventListener('mouseleave', this.menuMouseLeave);
            link.addEventListener('mouseleave', this.menuMouseLeave);
        });
    }

    [ON_OPEN_MENU]() {
        Container.getService('menu_text').clearClasses();
    }

    onMenuClick(event) {
        event.preventDefault();
        let target = event.target;
        Container.getService('router').navigate(target.getAttribute('href'), true);
        let dimm = document.querySelector('nav > ul > li.dimm');
        dimm.classList.remove('dimm');
        Container.getService('menu_text').toggleActive();
        setTimeout(() => {
            Container.getService('menu_text').toggleMoveToLeft();
            Container.getService('menu_text').toggleActive();
            Container.getService('menu_text').toggleOpaque();
        }, 2000);
        this.setActive();
    }

    onMenuMouseOver(event) {
        let list = event.target.parentElement;
        list.classList.add('hover');
        let active = document.querySelector('nav > ul > li.active');
        if (active !== list) {
            active.classList.add('dimm');
        }
        Container.getService('menu_text').updateTitle(event.target.innerHTML);
        Container.getService('menu_text').toggleOpaque();
    }

    onMenuMouseLeave(event) {
        let list = event.target.parentElement;
        list.classList.remove('hover');
        let active = document.querySelector('nav > ul > li.active');
        active.classList.remove('dimm');

        if (!Container.getService('menu_text').containsActive()) {
            Container.getService('menu_text').toggleOpaque();
        }
    }

    setActive() {
        let active = this.constructor.getId() + '-' + this.getActive();
        let menu = document.querySelectorAll("nav > ul > li > a");
        Array.from(menu).map(link => {
            link.parentElement.classList.remove('active');
        });
        let element = document.getElementById(active);
        element.parentElement.classList.add('active');
    }
}
