'use strict';

import Render from 'framework/Render';
import { addObservable } from 'framework/State';
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

    [ON_ROUTE_CASE]() {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = Container.getService('controller_case');
        Render.toScreen(this.oneCase, [Container.getService('controller_cases').constructor.getId()]);
        this.addEvents(this.oneCase);
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE]();
        }
        this.slides = Container.getService('controller_case_slides');
        Render.toScreen(this.slides, [Container.getService('controller_cases').constructor.getId(), parameters.slug]);
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

new App();
