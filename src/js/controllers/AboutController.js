'use strict';

import BaseController from '../controllers/BaseController';
import { dispatch, addObservable } from 'helpers/State';
import { ON_ABOUT_CONSTRUCTED } from 'config/actions';

export default class AboutController extends BaseController {

    constructor(router, header) {
        super(router, header);
    }

    static getId() {
        return 'about';
    }

    static create(router, header) {
        let about = new AboutController(router, header);
        addObservable(about);
        dispatch({
            listener: ON_ABOUT_CONSTRUCTED,
            data: {
                aboutCreated: true
            }
        });
        return about;
    }

    [ON_ABOUT_CONSTRUCTED](e) {

    }

    render() {
        return super.render([
            '<div id="' + this.constructor.getId() +'">',
            '<hr />',
            '<p>ABOUT</p>',
            '</div>'
        ]);
    }
}
