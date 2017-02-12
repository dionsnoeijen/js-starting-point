'use strict';

import BaseController from './BaseController';
import Snap from 'snapsvg';
import { dispatch, addObservable } from 'helpers/State';
import { ON_HOME_CONSTRUCTED } from '../config/actions';

export default class HomeController extends BaseController {

    constructor(i18n, router) {
        super(i18n, router);
        this.snap = Snap("#svg");
    }

    static getId() {
        return 'home';
    }

    static create(i18n, router) {
        let home = new HomeController(i18n, router);
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
        console.log('ON HOME CONSTRUCTED', e);
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
