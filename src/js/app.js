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
import Routes from 'config/Routes';
import { NL, EN } from 'config/config';
import { dispatch, addObservable, getState } from 'helpers/State';
import {
    ON_ROUTE_HOME,
    ON_ROUTE_ABOUT,
    ON_ROUTE_CASES,
    ON_ROUTE_CASE,
    ON_ROUTE_CASE_SLIDES,
    ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND
} from 'config/actions';

/**
 * The App is the entry point of this application
 * It construct's it's components when demanded and injects dependencies
 */
class App {

    constructor() {
        addObservable(this);
        this.router = new Navigo(null, false);
        this.i18n = new I18n();
        this.routes = new Routes(this.router, this.i18n);
    }

    static getId() {
        return 'app';
    }

    initializeNav(component) {
        let state = getState();
        if (!state.navigationInitialized) {
            if (this.nav === undefined) {
                this.nav = component.header.navigation;
            }
            this.nav.events();
            if (this.langNav === undefined) {
                this.langNav = component.header.languageNavigation;
            }
            this.langNav.events();
            dispatch({
                data: {
                    navigationInitialized: true
                }
            });
        }
    }

    [ON_ROUTE_ABOUT]() {
        if (this.about === undefined) {
            this.about = AboutController.create(this.i18n, this.router);
        }
        Render.toScreen(this.about);
        this.initializeNav(this.about);
        this.nav.setActive();
    }

    [ON_ROUTE_CASES]() {
        if (this.cases === undefined) {
            this.cases = CasesController.create(this.i18n, this.router);
        }
        Render.toScreen(this.cases);
        this.cases.events();
        this.initializeNav(this.cases);
        this.nav.setActive();
    }

    [ON_ROUTE_CASE](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = CaseController.create(this.i18n, this.router, parameters);
        Render.toScreen(this.oneCase, [CasesController.getId()]);
        this.oneCase.events();
        this.initializeNav(this.oneCase);
        this.nav.setActive();
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE](parameters);
        }
        this.slides = CaseSlidesController.create(this.i18n, this.router, parameters);
        Render.toScreen(this.slides, [CasesController.getId(), parameters.slug]);
        this.slides.events();
        this.initializeNav(this.slides);
        this.nav.setActive();
    }

    [ON_ROUTE_CONTACT]() {
        if (this.contact === undefined) {
            this.contact = ContactController.create(this.i18n, this.router);
        }
        Render.toScreen(this.contact);
        this.initializeNav(this.contact);
        this.nav.setActive();
    }

    [ON_ROUTE_HOME]() {
        if (this.home === undefined) {
            this.home = HomeController.create(this.i18n, this.router);
        }
        Render.toScreen(this.home);
        this.initializeNav(this.home);
        this.nav.setActive();
    }

    [ON_ROUTE_NOT_FOUND]() {
        return new NotFoundController(this.i18n, this.router);
    }
}

new App();
