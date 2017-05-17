'use strict';

import Render from '../framework/Render';
import { addObservable, dispatch, getState } from '../framework/State';
import {
    ON_ROUTE_HOME, ON_ROUTE_ABOUT, ON_ROUTE_CASES,
    ON_ROUTE_CASE, ON_ROUTE_CASE_SLIDES, ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND, ON_RENDERED, ON_OPEN_MENU,
    ON_CLOSE_MENU, ON_NAVIGATE, EVENTS
} from '../config/actions';
import Container from '../framework/Container';
import AboutController from "./AboutController";
import CasesController from "./CasesController";
import CaseController from "./CaseController";
import CaseSlidesController from "./CaseSlidesController";
import ContactController from "./ContactController";
import HomeController from "./HomeController";
import NotFoundController from "./NotFoundController";

export default class MainController {

    constructor() {
        addObservable(this);
        Container.getService('routes').setUpRoutes();
    }

    static getId() {
        return 'app';
    }

    rendered(component) {
        if (this.grid === undefined) {
            this.grid = document.querySelector('#grid');
        }
        if (this.containerNav === undefined) {
            this.containerNav = document.querySelector('#container_nav');
        }
        dispatch({listener: [
            ON_RENDERED,
            ON_CLOSE_MENU
        ], data: {
            component: component
        }});
        this.addEvents(component);
        component.animateIn();
    }

    addEvents(component) {
        if (component !== undefined &&
            component['events']) {
            component.events();
        }
        Container.getService('menu_button').events();
        Container.getService('navigation').events();
        Container.getService('language_navigation').events();
        Container.getService('navigation').setActive();
    }

    [ON_OPEN_MENU]() {
        this.grid.className = 'open';
        this.containerNav.className = 'open';
    }

    [ON_CLOSE_MENU]() {
        this.grid.className = '';
        this.containerNav.className = '';
    }

    [ON_NAVIGATE](data) {
        // Hmm, second dispatch works, check for better solution.
        dispatch({
            listener: ON_CLOSE_MENU
        });
        Container.getService(getState('activePage')).animateOut(() => {
            Container.getService('router').navigate(data.href, true);
        });
    }

    [ON_ROUTE_ABOUT]() {
        let about = Container.getService(AboutController.getId());
        Render.toScreen(about, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASES]() {
        this.cases = Container.getService(CasesController.getId());
        Render.toScreen(this.cases, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE]() {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = Container.getService(CaseController.getId());
        Render.toScreen(this.oneCase, [Container.getService(CasesController.getId()).constructor.getId()], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE]();
        }
        this.slides = Container.getService(CaseSlidesController.getId());
        Render.toScreen(
            this.slides,
            [
                Container.getService(CasesController.getId()).constructor.getId(),
                parameters.slug
            ],
            this.rendered.bind(this)
        );
        this.slides.animateIn();
    }

    [ON_ROUTE_CONTACT]() {
        let contact = Container.getService(ContactController.getId());
        Render.toScreen(contact, [], this.rendered.bind(this));
    }

    [ON_ROUTE_HOME]() {
        let home = Container.getService(HomeController.getId());
        Render.toScreen(home, [], this.rendered.bind(this));
    }

    [ON_ROUTE_NOT_FOUND]() {
        let notFound = Container.getService(NotFoundController.getId());
        Render.toScreen(notFound, [], this.rendered.bind(this));
    }
}
