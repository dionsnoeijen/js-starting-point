'use strict';

import Render from 'helpers/Render';
import CasesController from 'controllers/CasesController';
import { addObservable } from 'helpers/State';
import {
    ON_ROUTE_HOME, ON_ROUTE_ABOUT, ON_ROUTE_CASES,
    ON_ROUTE_CASE, ON_ROUTE_CASE_SLIDES, ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND
} from 'config/actions';
import Container from 'framework/Container';

/**
 * The App is the entry point of this application
 * It construct's it's components when demanded and injects dependencies
 */
class App {

    constructor() {
        addObservable(this);
        Container.getService('routes').setUpRoutes();
    }

    static create() {
        return new App();
    }

    static getId() {
        return 'app';
    }

    addEvents(component) {
        if (component !== undefined &&
            component['events']) {
            component.events();
        }
        Container.getService('navigation').events();
        Container.getService('language_navigation').events();
        Container.getService('navigation').setActive();
    }

    [ON_ROUTE_ABOUT]() {
        let about = Container.getService('controller_about');
        Render.toScreen(about);
        this.addEvents(about);
    }

    [ON_ROUTE_CASES]() {
        this.cases = Container.getService('controller_cases');
        Render.toScreen(this.cases);
        this.addEvents(this.cases);
    }

    [ON_ROUTE_CASE](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = Container.getService('controller_case');
        this.oneCase.setParameters(parameters.parameters);
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
        this.slides = Container.getService('controller_case_slides');
        this.slides.setParameters(parameters.parameters);
        Render.toScreen(this.slides, [CasesController.getId(), parameters.slug]);
        this.addEvents(this.slides);
    }

    [ON_ROUTE_CONTACT]() {
        let contact = Container.getService('controller_contact');
        Render.toScreen(contact);
        this.addEvents(contact);
    }

    [ON_ROUTE_HOME]() {
        let home = Container.getService('controller_home');
        Render.toScreen(home);
        this.addEvents(home);
    }

    [ON_ROUTE_NOT_FOUND]() {
        let notFound = Container.getService('controller_not_found');
        Render.toScreen(notFound);
        this.addEvents(notFound);
    }
}

App.create();
