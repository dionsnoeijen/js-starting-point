'use strict';

import Navigo from 'navigo';
import Screen from '../framework/Screen';
import Routes from './Routes';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LanguageNavigation from '../components/LanguageNavigation';
import HomeSlider from '../components/HomeSlider';
import HomeSliderControls from '../components/HomeSliderControls';
import MenuButton from '../components/MenuButton';
import MenuText from '../components/MenuText';
import HexagonHomePattern from '../components/HexagonHomePattern';
import HomeColorLayer from '../components/HomeColorLayer';
import HomeHexagonHelper from '../components/HomeHexagonHelper';

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

const screen = new Screen();

export const services = {
    router: navigo,
    routes: routes,
    header: new Header(),
    navigation: new Navigation(),
    language_navigation: new LanguageNavigation(),
    home_slider: new HomeSlider(),
    home_slider_controls: new HomeSliderControls(),
    menu_button: new MenuButton(),
    menu_text: new MenuText(),
    home_hexagon_helper: new HomeHexagonHelper(screen),
    hexagon_home_pattern: new HexagonHomePattern(screen, HomeController.getId()),
    home_color_layer: new HomeColorLayer(screen, HomeController.getId()),

    // Controllers
    [HomeController.getId()]: new HomeController(),
    [AboutController.getId()]: new AboutController(),
    [CasesController.getId()]: new CasesController(),
    [CaseController.getId()]: new CaseController(),
    [CaseSlidesController.getId()]: new CaseSlidesController(),
    [ContactController.getId()]: new ContactController(),
    [NotFoundController.getId()]: new NotFoundController()
};
