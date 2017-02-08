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
        this.navigationInitialized = false;
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

    initializeNav(component) {
        if (!this.navigationInitialized) {
            if (this.nav === undefined) {
                this.nav = component.header.navigation;
            }
            this.nav.events();
        }
        this.navigationInitialized = true;
    }

    createAbout() {
        if (this.about === undefined) {
            this.about = new AboutController(this.i18n, this.router);
        }
        Render.toScreen(this.about);
        this.initializeNav(this.about);
        this.nav.setActive();
        return this.about;
    }

    createCases() {
        if (this.cases === undefined) {
            this.cases = new CasesController(this.i18n, this.router);
        }
        Render.toScreen(this.cases);
        this.cases.events();
        this.initializeNav(this.cases);
        this.nav.setActive();
        return this.cases;
    }

    createCase(parameters) {
        let casesId = CasesController.getId();
        if (document.getElementById(casesId) === null) {
            this.createCases();
        }
        this.oneCase = new CaseController(this.i18n, this.router, parameters)
        Render.toScreen(this.oneCase, [casesId]);
        this.oneCase.events();
        this.initializeNav(this.oneCase);
        this.nav.setActive();
        return this.oneCase;
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
        this.slides = new CaseSlidesController(this.i18n, this.router, parameters);
        Render.toScreen(this.slides, [casesId, caseId]);
        this.slides.events();
        this.initializeNav(this.slides);
        this.nav.setActive();
        return this.slides;
    }

    createContact() {
        if (this.contact === undefined) {
            this.contact = new ContactController(this.i18n, this.router);
        }
        Render.toScreen(this.contact);
        this.initializeNav(this.contact);
        this.nav.setActive();
        return this.contact;
    }

    createHome() {
        if (this.home === undefined) {
            this.home = new HomeController(this.i18n, this.router);
        }
        Render.toScreen(this.home);
        this.initializeNav(this.home);
        this.nav.setActive();
        return this.home;
    }

    createNotFound() {
        return new NotFoundController(this.i18n, this.router);
    }
}

new App();
