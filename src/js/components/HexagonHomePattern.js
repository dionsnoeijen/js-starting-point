'use strict';

import Snap from 'snapsvg';
import { addObservable } from '../framework/State';
import { ON_RENDERED } from '../config/actions';
import HomeController from '../controllers/HomeController';

export default class HexagonHomePattern {

    constructor(screen) {
        addObservable(this);
        this.SVG_ANIMATION_ID = 'hexagon-pattern_animation';
        this.screen = screen;
        this.screen.addEventListener('resize', this.onScreenResize.bind(this));
        this.top = 50;
        this.polygonHeight = 173.25;
    }

    polygonPositions() {
        this.positions = [
            // Row 1
            {x: -40, y: this.top},
            {x: this.screen.getCenter().x - 320, y: this.top},
            {x: this.screen.getCenter().x - 170, y: this.top},
            {x: this.screen.getCenter().x + 60, y: this.top},
            {x: this.screen.getCenter().x + 210, y: this.top},

            // Row 2
            {x: -70, y: this.top + this.polygonHeight},
            {x: this.screen.getCenter().x + 30, y: this.top + this.polygonHeight},
            {x: this.screen.getCenter().x + 260, y: this.top + this.polygonHeight},
            {x: this.screen.getCenter().x + 410, y: this.top + this.polygonHeight},

            // Row 3
            {x: -40, y: this.top + (this.polygonHeight * 2)},
            {x: 110, y: this.top + (this.polygonHeight * 2)},
            {x: 340, y: this.top + (this.polygonHeight * 2)},
            {x: this.screen.getCenter().x + 210, y: this.top + (this.polygonHeight * 2)},

            // Row 4
            {x: -70, y: this.top + (this.polygonHeight * 3)},
            {x: 160, y: this.top + (this.polygonHeight * 3)},
            {x: this.screen.getCenter().x - 100, y: this.top + (this.polygonHeight * 3)},
            {x: this.screen.getCenter().x + 300, y: this.top + (this.polygonHeight * 3)},

            // Row 5
            {x: -40, y: this.top + (this.polygonHeight * 4)},
            {x: 110, y: this.top + (this.polygonHeight * 4)},
            {x: 320, y: this.top + (this.polygonHeight * 4)},
            {x: this.screen.getCenter().x + 60, y: this.top + (this.polygonHeight * 4)},
            {x: this.screen.getCenter().x + 210, y: this.top + (this.polygonHeight * 4)},
        ];
    }

    static getId() {
        return 'hexagon-pattern';
    }

    [ON_RENDERED](data) {
        if (data.component.constructor.getId() === HomeController.getId()) {
            this.polygons = [];
            this.lines = [];
            if (this.snap !== undefined) {
                delete this.snap;
            }
            this.snap = new Snap('#' + this.SVG_ANIMATION_ID);
            this.drawSvg();
            this.initialized = true;
        }
    }

    onScreenResize() {
        this.drawSvg();
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
        this.polygonPositions();
        let spacing = this.polygonHeight / 2;
        if (this.topLine === undefined) {
            this.topLine = this.snap.paper.line(0, 0, 0, 0);
            this.topLine.attr({
                stroke: "rgba(214, 217, 222, 1)",
                strokeWidth: .5
            });
        }
        for (let i in this.positions) {
            if (this.positions.hasOwnProperty(i)) {
                if (this.polygons[i] === undefined) {
                    this.polygons[i] = this.drawPolygon();
                }
                this.polygons[i].transform('t' + this.positions[i].x + ' ' + this.positions[i].y);
            }
        }
        for (let i = 1 ; i < 10 ; i++) {
            if (this.lines[i] === undefined) {
                this.lines.push(this.drawLine());
            }
            this.lines[i - 1].attr({
                x1: 0,
                x2: this.screen.getSize().x,
                y1: this.top + (i * spacing),
                y2: this.top + (i * spacing)
            });
        }
    }

    render() {
        return([
            '<div id="' + this.constructor.getId() + '">',
                '<svg id="' + this.SVG_ANIMATION_ID + '"></svg>',
            '</div>'
        ]);
    }
}

