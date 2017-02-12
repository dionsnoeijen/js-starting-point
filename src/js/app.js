'use strict';

import Navigo from 'navigo';
import Render from 'helpers/Render';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import LanguageNavigation from 'components/LanguageNavigation';
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

    constructor(navigo, routes, header, navigation, languageNavigation) {
        addObservable(this);
        this.router = navigo;
        this.routes = routes;
        this.header = header;
        this.navigation = navigation;
        this.languageNavigation = languageNavigation;
        this.routes.setUpRoutes();
    }

    static create() {
        let router = new Navigo(null, false);
        let routes = new Routes(router);
        let navigation = Navigation.create(router);
        let languageNavigation = LanguageNavigation.create(router);
        let header = new Header(router, navigation, languageNavigation);
        return new App(
            router, routes, header, navigation, languageNavigation
        );
    }

    static getId() {
        return 'app';
    }

    addEvents(component) {
        if (component !== undefined) {
            component.events();
        }
        this.navigation.events();
        this.languageNavigation.events();
        this.navigation.setActive();
    }

    [ON_ROUTE_ABOUT]() {
        if (this.about === undefined) {
            this.about = AboutController.create(this.router, this.header);
        }
        Render.toScreen(this.about);
        this.addEvents();
    }

    [ON_ROUTE_CASES]() {
        if (this.cases === undefined) {
            this.cases = CasesController.create(this.router, this.header);
        }
        Render.toScreen(this.cases);
        this.addEvents(this.cases);
    }

    [ON_ROUTE_CASE](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = CaseController.create(this.router, this.header, parameters);
        Render.toScreen(this.oneCase, [CasesController.getId()]);
        this.addEvents(this.oneCase);
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE](parameters);
        }
        this.slides = CaseSlidesController.create(this.router, this.header, parameters);
        Render.toScreen(this.slides, [CasesController.getId(), parameters.slug]);
        this.addEvents(this.slides);
    }

    [ON_ROUTE_CONTACT]() {
        if (this.contact === undefined) {
            this.contact = ContactController.create(this.router, this.header);
        }
        Render.toScreen(this.contact);
        this.addEvents();
    }

    [ON_ROUTE_HOME]() {
        if (this.home === undefined) {
            this.home = HomeController.create(this.router, this.header);
        }
        Render.toScreen(this.home);
        this.addEvents();
    }

    [ON_ROUTE_NOT_FOUND]() {
        return new NotFoundController(this.router, this.header);
    }
}

App.create();
