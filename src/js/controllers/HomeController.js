'use strict';

import BaseController from './BaseController';
import { dispatch, addObservable } from 'helpers/State';
import { ON_HOME_CONSTRUCTED } from '../config/actions';

export default class HomeController extends BaseController {

    constructor(router, header) {
        super(router, header);
    }

    static getId() {
        return 'home';
    }

    static create(router, header) {
        let home = new HomeController(router, header);
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
