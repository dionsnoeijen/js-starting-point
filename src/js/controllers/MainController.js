'use strict';

import Render from '../framework/Render';
import { addObservable, dispatch, getState } from '../framework/State';
import {
    ON_ROUTE_HOME, ON_ROUTE_ABOUT, ON_ROUTE_CASES,
    ON_ROUTE_CASE, ON_ROUTE_CASE_SLIDES, ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND, ON_RENDERED, ON_OPEN_MENU,
    ON_CLOSE_MENU, ON_NAVIGATE
} from '../config/actions';
import Container from '../framework/Container';

export default class MainController {

    constructor(
        homeController,
        aboutController,
        casesController,
        caseController,
        caseSlidesController,
        contactController,
        notFoundController
    ) {
        addObservable(this);
        this.homeController = homeController;
        this.aboutController = aboutController;
        this.casesController = casesController;
        this.caseController = caseController;
        this.caseSlidesController = caseSlidesController;
        this.contactController = contactController;
        this.notFoundController = notFoundController;
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
        Render.toScreen(this.aboutController, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASES]() {
        this.cases = this.casesController;
        Render.toScreen(this.casesController, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE]() {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = this.caseController;
        Render.toScreen(this.caseController, [this.casesController.constructor.getId()], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE]();
        }
        this.slides = this.caseSlidesController;
        Render.toScreen(
            this.slides,
            [
                this.casesController.constructor.getId(),
                parameters.slug
            ],
            this.rendered.bind(this)
        );
        this.slides.animateIn();
    }

    [ON_ROUTE_CONTACT]() {
        Render.toScreen(this.contactController, [], this.rendered.bind(this));
    }

    [ON_ROUTE_HOME]() {
        Render.toScreen(this.homeController, [], this.rendered.bind(this));
    }

    [ON_ROUTE_NOT_FOUND]() {
        Render.toScreen(this.notFoundController, [], this.rendered.bind(this));
    }
}
