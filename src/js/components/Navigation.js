'use strict';

export default class Navigation {

    constructor(i18n, router) {
        this.i18n = i18n;
        this.router = router;
    }

    static getId() {
        return 'navigation';
    }

    getActive() {
        let locations = window.location.pathname.split('/');
        if (locations[2] === undefined) {
            return this.i18n.getTranslation('home.page.id');
        }
        return locations[2];
    }

    getNavigationElements() {
        return ([
            {
                name: this.i18n.getTranslation('home'),
                href: this.i18n.getRoute('home'),
                key: this.constructor.getId() + '-' + this.i18n.getTranslation('home.page.id')
            },
            {
                name: this.i18n.getTranslation('cases'),
                href: this.i18n.getRoute('cases'),
                key: this.constructor.getId() + '-' + this.i18n.getTranslation('cases.page.id')
            },
            {
                name: this.i18n.getTranslation('about'),
                href: this.i18n.getRoute('about'),
                key: this.constructor.getId() + '-' + this.i18n.getTranslation('about.page.id')
            },
            {
                name: this.i18n.getTranslation('contact'),
                href: this.i18n.getRoute('contact'),
                key: this.constructor.getId() + '-' + this.i18n.getTranslation('contact.page.id')
            }
        ]);
    }

    render() {
        return ([
            '<nav id="' + this.constructor.getId() + '-' + this.i18n.determineLanguage() + '">',
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
        this.router.navigate(target.getAttribute('href'), true);
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
