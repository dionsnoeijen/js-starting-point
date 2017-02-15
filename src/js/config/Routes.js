'use strict';

import { dispatch } from '../helpers/State';
import { NL, EN } from 'config/config';
import {
    ON_ROUTE_HOME,
    ON_ROUTE_ABOUT,
    ON_ROUTE_CASES,
    ON_ROUTE_CASE,
    ON_ROUTE_CASE_SLIDES,
    ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND,
    SET_PARAMETERS
} from './actions';
import I18n from '../helpers/i18n';

export default class Routes {

    constructor(router) {
        this.router = router;
    }

    /**
     * We have a route for each language
     * Dispatch on hit, dispatching to app.js
     */
    setUpRoutes() {
        this.router.on({
            [ I18n.getRoute('about', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_ABOUT,
                    data: {
                        lang: EN
                    }
                });
            },
            [ I18n.getRoute('about', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_ABOUT,
                    data: {
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('cases', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CASES,
                    data: {
                        lang: EN
                    }
                });
            },
            [ I18n.getRoute('cases', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CASES,
                    data: {
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('case', null, EN) ]: (parameters) => {
                dispatch({
                    listener: [
                        ON_ROUTE_CASE,
                        SET_PARAMETERS
                    ],
                    data: {
                        parameters: parameters,
                        data: {
                            lang: EN
                        }
                    }
                });
            },
            [ I18n.getRoute('case', null, NL) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE,
                    data: {
                        parameters: parameters,
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('case.slides', null, EN) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE_SLIDES,
                    data: {
                        parameters: parameters,
                        lang: EN
                    }
                });
            },
            [ I18n.getRoute('case.slides', null, NL) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE_SLIDES,
                    data: {
                        parameters: parameters,
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('contact', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CONTACT,
                    data: {
                        lang: EN
                    }
                });
            },
            [ I18n.getRoute('contact', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CONTACT,
                    data: {
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('home', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_HOME,
                    data: {
                        lang: EN
                    }
                });
            },
            [ I18n.getRoute('home', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_HOME,
                    data: {
                        lang: NL
                    }
                });
            },
            [ I18n.getRoute('404', null, EN) ]: () => {
                if (window.location.pathname !== I18n.getRoute('home', null, EN)) {
                    dispatch({
                        listener: ON_ROUTE_NOT_FOUND,
                        data: {
                            lang: EN
                        }
                    });
                }
                this.router.navigate(I18n.getRoute('home', null, EN), true);
            },
            [ I18n.getRoute('404', null, NL) ]: () => {
                if (window.location.pathname !== '/') {
                    dispatch({
                        listener: ON_ROUTE_NOT_FOUND,
                        data: {
                            lang: NL
                        }
                    });
                }
                this.router.navigate(I18n.getRoute('home', null, NL), true);
            }
        });
        this.router.resolve();
    }
}
