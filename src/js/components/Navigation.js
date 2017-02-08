'use strict';

export default class Navigation {

    constructor(i18n, router) {
        this.i18n = i18n;
        this.router = router;
    }

    static getId() {
        return 'navigation';
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
            '<nav id="' + this.constructor.getId() + '">',
                '<ul>',
                ... this.getNavigationElements().map(element => {
                    return ([
                        '<li>',
                            '<a href="' + element.href + '">',
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
        let menu = document.querySelectorAll("nav > li > a");
        Array.from(menu).map(link => {
            link.addEventListener('click', this.onMenuClick.bind(this));
        });
    }

    onMenuClick(event) {
        event.preventDefault();
        let target = event.target;
        this.router.navigate(target.getAttribute('href'), true);
    }
}
