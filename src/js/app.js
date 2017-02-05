'use strict';

import Navigo from 'navigo';
import I18n from 'helpers/i18n';
import HomeController from 'controllers/HomeController';
import AboutController from 'controllers/AboutController';
import CasesController from 'controllers/CasesController';
import CaseController from 'controllers/CaseController';
import CaseSlidesController from 'controllers/CaseSlidesController';
import ContactController from 'controllers/ContactController';
import NotFoundController from 'controllers/NotFoundController';

class App {

    constructor() {
        // Application setup
        let i18n = new I18n();
        let router = new Navigo(null, false);
        router.on({
            '/en/about-me': () => { new AboutController(i18n); },
            '/nl/over-mij': () => { new AboutController(i18n); },
            '/en/cases': () => { new CasesController(i18n); },
            '/nl/projecten': () => { new CasesController(i18n) },
            '/en/case/:slug': (parameters) => { new CaseController(i18n, parameters) },
            '/nl/project/:slug': (parameters) => { new CaseController(i18n, parameters) },
            '/en/case/:slug/slides': (parameters) => { new CaseSlidesController(i18n, parameters) },
            '/nl/project/:slug/afbeeldingen': (parameters) => { new CaseSlidesController(i18n, parameters) },
            '/en/contact': () => { new ContactController(i18n) },
            '/nl/contact': () => { new ContactController(i18n) },
            '/en': () => { new HomeController(i18n) },
            '/nl': () => { new HomeController(i18n) },
            '/en/*': () => {
                if (window.location.pathname !== '/en') {
                    new NotFoundController(i18n);
                    return;
                }
                router.navigate('/en');
            },
            '*': () => {
                if (window.location.pathname !== '/') {
                    new NotFoundController(i18n);
                    return;
                }
                router.navigate('/nl');
            }
        });
        router.resolve();
    }
}

new App();
