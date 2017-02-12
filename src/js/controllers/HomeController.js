'use strict';

import BaseController from './BaseController';
import Snap from 'snapsvg';
import { dispatch, addObservable } from 'helpers/State';
import { ON_HOME_CONSTRUCTED } from '../config/actions';

export default class HomeController extends BaseController {

    constructor(i18n, router, header) {
        super(i18n, router, header);
        this.snap = Snap("#svg");
    }

    static getId() {
        return 'home';
    }

    static create(i18n, router, header) {
        let home = new HomeController(i18n, router, header);
        addObservable(home);
        dispatch({
            listener: ON_HOME_CONSTRUCTED,
            data: {
                homeCreated: true
            }
        });
        return home;
    }

    [ON_HOME_CONSTRUCTED](e) {

    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() + '">',
            '<hr />',
            '<p>Home</p>',
            '</div>'
        ]);
    }
}
