'use strict';

import Render from '../framework/Render';
import { addObservable, dispatch } from '../framework/State';
import {
    ON_ROUTE_HOME, ON_ROUTE_ABOUT, ON_ROUTE_CASES,
    ON_ROUTE_CASE, ON_ROUTE_CASE_SLIDES, ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND, ON_RENDERED, ON_OPEN_MENU, ON_CLOSE_MENU
} from '../config/actions';
import Container from '../framework/Container';

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
        ]});
        this.addEvents(component);
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

    [ON_ROUTE_ABOUT]() {
        let about = Container.getService('controller_about');
        Render.toScreen(about, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASES]() {
        this.cases = Container.getService('controller_cases');
        Render.toScreen(this.cases, [], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE]() {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        this.oneCase = Container.getService('controller_case');
        Render.toScreen(this.oneCase, [Container.getService('controller_cases').constructor.getId()], this.rendered.bind(this));
    }

    [ON_ROUTE_CASE_SLIDES](parameters) {
        if (this.cases === undefined) {
            this[ON_ROUTE_CASES]();
        }
        if (this.oneCase === undefined) {
            this[ON_ROUTE_CASE]();
        }
        this.slides = Container.getService('controller_case_slides');
        Render.toScreen(
            this.slides,
            [
                Container.getService('controller_cases').constructor.getId(),
                parameters.slug
            ],
            this.rendered.bind(this)
        );
    }

    [ON_ROUTE_CONTACT]() {
        let contact = Container.getService('controller_contact');
        Render.toScreen(contact, [], this.rendered.bind(this));
    }

    [ON_ROUTE_HOME]() {
        let home = Container.getService('controller_home');
        Render.toScreen(home, [], this.rendered.bind(this));
    }

    [ON_ROUTE_NOT_FOUND]() {
        let notFound = Container.getService('controller_not_found');
        Render.toScreen(notFound, [], this.rendered.bind(this));
    }
}
