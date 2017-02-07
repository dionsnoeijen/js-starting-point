'use strict';

export default class Navigation {

    constructor(i18n) {
        this.i18n = i18n;
    }

    getNavigationElements() {
        return ([
            {
                name: this.i18n.getTranslation('home'),
                href: this.i18n.getRoute('home')
            },
            {
                name: this.i18n.getTranslation('cases'),
                href: this.i18n.getRoute('cases')
            },
            {
                name: this.i18n.getTranslation('about'),
                href: this.i18n.getRoute('about')
            },
            {
                name: this.i18n.getTranslation('contact'),
                href: this.i18n.getRoute('contact')
            }
        ]);
    }

    render() {
        return ([
            '<nav>',
            ... this.getNavigationElements().map(function(element) {
                return ([
                    '<li>',
                        '<a href="' + element.href + '">',
                        element.name,
                        '</a>',
                    '</li>'
                ].join(''));
            }),
            '</nav>'
        ]);
    }
}
