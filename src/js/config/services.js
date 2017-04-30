'use strict';

import Navigo from 'navigo';
import Routes from './Routes';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LanguageNavigation from '../components/LanguageNavigation';
import HomeSlider from '../components/HomeSlider';
import MenuButton from '../components/MenuButton';
import MenuText from '../components/MenuText';
import HomeController from '../controllers/HomeController';
import AboutController from '../controllers/AboutController';
import CasesController from '../controllers/CasesController';
import CaseController from '../controllers/CaseController';
import CaseSlidesController from '../controllers/CaseSlidesController';
import ContactController from '../controllers/ContactController';
import NotFoundController from '../controllers/NotFoundController';

// Set up dependencies
const navigo = new Navigo(null, false);
const routes = new Routes(navigo);

export const services = {
    router: navigo,
    routes: routes,
    header: new Header(),
    navigation: new Navigation(),
    language_navigation: new LanguageNavigation(),
    home_slider: new HomeSlider(),
    menu_button: new MenuButton(),
    menu_text: new MenuText(),
    controller_home: new HomeController(),
    controller_about: new AboutController(),
    controller_cases: new CasesController(),
    controller_case: new CaseController(),
    controller_case_slides: new CaseSlidesController(),
    controller_contact: new ContactController(),
    controller_not_found: new NotFoundController(),
};
