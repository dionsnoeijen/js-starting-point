'use strict';

import Snap from 'snapsvg';
import { addObservable, getState } from '../framework/State';
import { ON_RENDERED } from '../config/actions';
import Container from '../framework/Container';

export default class HexagonHomePattern {

    constructor(screen, renderId) {
        addObservable(this);
        this.SVG_ANIMATION_ID = 'hexagon-pattern_animation';
        this.renderId = renderId;
        this.screen = screen;
        this.screen.addEventListener('resize', this.onScreenResize.bind(this));
    }

    static getId() {
        return 'hexagon-pattern';
    }

    [ON_RENDERED](data) {
        if (data.component.constructor.getId() === this.renderId) {
            this.polygons = [];
            this.lines = [];
            if (this.snap !== undefined) {
                delete this.snap;
            }
            this.snap = new Snap('#' + this.SVG_ANIMATION_ID);
            this.drawSvg();
        }
    }

    onScreenResize() {
        if (getState('activePage') === this.renderId) {
            this.drawSvg();
        }
    }

    drawPolygon() {
        let polygon = this.snap.path('M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z');
        polygon.attr({
            stroke: "rgba(214, 217, 222, 1)",
            strokeWidth: .5,
            fill: 'transparent'
        });
        return polygon;
    }

    drawLine() {
        let line = this.snap.paper.line(0, 0, 0, 0);
        line.attr({
            stroke: "rgba(214, 217, 222, 1)",
            strokeWidth: .5
        });

        return line;
    }

    drawSvg() {
        let polygonPositions = Container.getService('home_hexagon_helper').polygonPositions();
        let linePositions = Container.getService('home_hexagon_helper').linePositions();
        for (let i in polygonPositions) {
            if (polygonPositions.hasOwnProperty(i)) {
                if (this.polygons[i] === undefined) {
                    this.polygons[i] = this.drawPolygon();
                }
                this.polygons[i].transform(
                    't' + polygonPositions[i].x +
                    ' ' + polygonPositions[i].y
                );
            }
        }
        for (let i = 1 ; i < 10 ; i++) {
            if (this.lines[i] === undefined) {
                this.lines.push(this.drawLine());
            }
            this.lines[i - 1].attr(linePositions[i - 1]);
        }
    }

    animateIn() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('out');
        element.classList.add('in');
    }

    animateOut() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('in');
        element.classList.add('out');
    }

    render() {
        return([
            '<div id="' + this.constructor.getId() + '">',
                '<svg id="' + this.SVG_ANIMATION_ID + '"></svg>',
            '</div>'
        ]);
    }
}

