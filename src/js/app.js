'use strict';

import Navigo from 'navigo';
import I18n from 'helpers/i18n';
import Render from 'helpers/Render';
import HomeController from 'controllers/HomeController';
import AboutController from 'controllers/AboutController';
import CasesController from 'controllers/CasesController';
import CaseController from 'controllers/CaseController';
import CaseSlidesController from 'controllers/CaseSlidesController';
import ContactController from 'controllers/ContactController';
import NotFoundController from 'controllers/NotFoundController';
import { NL, EN } from 'config/config';

class App {

    constructor() {

        this.i18n = new I18n();
        this.router = new Navigo(null, false);
        this.router.on({
            [ this.i18n.getRoute('about', null, EN) ]: () => { this.createAbout(); },
            [ this.i18n.getRoute('about', null, NL) ]: () => { this.createAbout(); },
            [ this.i18n.getRoute('cases', null, EN) ]: () => { this.createCases(); },
            [ this.i18n.getRoute('cases', null, NL) ]: () => { this.createCases(); },
            [ this.i18n.getRoute('case', null, EN) ]: (parameters) => { this.createCase(parameters); },
            [ this.i18n.getRoute('case', null, NL) ]: (parameters) => { this.createCase(parameters); },
            [ this.i18n.getRoute('case.slides', null, EN) ]: (parameters) => { this.createCaseSlides(parameters); },
            [ this.i18n.getRoute('case.slides', null, NL) ]: (parameters) => { this.createCaseSlides(parameters); },
            [ this.i18n.getRoute('contact', null, EN) ]: () => { this.createContact(); },
            [ this.i18n.getRoute('contact', null, NL) ]: () => { this.createContact(); },
            [ this.i18n.getRoute('home', null, EN) ]: () => { this.createHome() },
            [ this.i18n.getRoute('home', null, NL) ]: () => { this.createHome() },
            [ this.i18n.getRoute('404', null, EN) ]: () => {
                if (window.location.pathname !== this.i18n.getRoute('home', null, EN)) {
                    this.createNotFound();
                }
                this.router.navigate(this.i18n.getRoute('home', null, EN), true);
            },
            [ this.i18n.getRoute('404', null, NL) ]: () => {
                if (window.location.pathname !== '/') {
                    this.createNotFound();
                }
                this.router.navigate(this.i18n.getRoute('home', null, NL), true);
            }
        });
        this.router.resolve();
    }

    createAbout() {
        let about = new AboutController(this.i18n, this.router);
        Render.toScreen(about);
        about.header.navigation.events();
        return about;
    }

    createCases() {
        let cases = new CasesController(this.i18n, this.router);
        Render.toScreen(cases);
        cases.events();
        return cases;
    }

    createCase(parameters) {
        let casesId = CasesController.getId();
        if (document.getElementById(casesId) === null) {
            this.createCases();
        }
        let oneCase = new CaseController(this.i18n, this.router, parameters);
        Render.toScreen(oneCase, [casesId]);
        oneCase.events();
        return oneCase;
    }

    createCaseSlides(parameters) {
        let casesId = CasesController.getId();
        if (document.getElementById(casesId) === null) {
            this.createCases();
        }
        let caseId = parameters.slug;
        if (document.getElementById(caseId) === null) {
            this.createCase(parameters);
        }
        let slides = new CaseSlidesController(this.i18n, this.router, parameters);
        Render.toScreen(slides, [casesId, caseId]);
        slides.events();
        return slides;
    }

    createContact() {
        let contact = new ContactController(this.i18n, this.router);
        Render.toScreen(contact);
        contact.header.navigation.events();
        return contact;
    }

    createHome() {
        let home = new HomeController(this.i18n, this.router);
        Render.toScreen(home);
        home.header.navigation.events();
        return home;
    }

    createNotFound() {
        return new NotFoundController(this.i18n, this.router);
    }
}

new App();
