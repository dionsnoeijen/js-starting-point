'use strict';

import BaseController from '../controllers/BaseController';
import { dispatch, addObservable } from 'helpers/State';
import { ON_ABOUT_CONSTRUCTED } from 'config/actions';

export default class AboutController extends BaseController {

    constructor(i18n, router) {
        super(i18n, router);
    }

    static getId() {
        return 'about';
    }

    static create(i18n, router) {
        let about = new AboutController(i18n, router);
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
        console.log('ON ABOUT CONSTRUCTED', e);
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
