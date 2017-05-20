'use strict';

export default class HomeHexagonHelper {

    constructor(screen) {
        this.screen = screen;
        this.top = 50;
        this.polygonHeight = 173.25;
        this.polygonWidth = this.polygonHeight + 26;
    }

    polygonPositions() {
        return [
            // Row 1
            {x: -40, y: this.top}, //0
            {x: this.screen.getCenter().x - 320, y: this.top}, //1
            {x: this.screen.getCenter().x - 170, y: this.top}, //2
            {x: this.screen.getCenter().x + 60, y: this.top}, //3
            {x: this.screen.getCenter().x + 210, y: this.top}, //4

            // Row 2
            {x: -70, y: this.top + this.polygonHeight}, //5
            {x: this.screen.getCenter().x + 30, y: this.top + this.polygonHeight}, //6
            {x: this.screen.getCenter().x + 260, y: this.top + this.polygonHeight}, //7
            {x: this.screen.getCenter().x + 410, y: this.top + this.polygonHeight}, //8

            // Row 3
            {x: -40, y: this.top + (this.polygonHeight * 2)}, //9
            {x: 110, y: this.top + (this.polygonHeight * 2)}, //10
            {x: 340, y: this.top + (this.polygonHeight * 2)}, //11
            {x: this.screen.getCenter().x + 210, y: this.top + (this.polygonHeight * 2)}, //12

            // Row 4
            {x: -70, y: this.top + (this.polygonHeight * 3)}, //13
            {x: 160, y: this.top + (this.polygonHeight * 3)}, //14
            {x: this.screen.getCenter().x - 100, y: this.top + (this.polygonHeight * 3)}, //15
            {x: this.screen.getCenter().x + 300, y: this.top + (this.polygonHeight * 3)}, //16

            // Row 5
            {x: -40, y: this.top + (this.polygonHeight * 4)}, //17
            {x: 110, y: this.top + (this.polygonHeight * 4)}, //18
            {x: 320, y: this.top + (this.polygonHeight * 4)}, //19
            {x: this.screen.getCenter().x + 60, y: this.top + (this.polygonHeight * 4)}, //20
            {x: this.screen.getCenter().x + 210, y: this.top + (this.polygonHeight * 4)} //21
        ];
    }

    getLinePosition(i, length) {
        let spacing = this.polygonHeight / 2;
        return {
            x1: 0,
            x2: length,
            y1: this.top + (i * spacing),
            y2: this.top + (i * spacing)
        };
    }

    getPolygonWidth() {
        return this.polygonWidth;
    }

    getTop() {
        return this.top;
    }

    linePositions() {
        return [
            this.getLinePosition(1, this.screen.getCenter().x + 210 + this.polygonWidth), //0
            this.getLinePosition(2, this.screen.getCenter().x + 410 + (this.polygonWidth / 2)), //1
            this.getLinePosition(3, this.screen.getCenter().x + 410 + this.polygonWidth), //2
            this.getLinePosition(4, this.screen.getCenter().x + 410 + (this.polygonWidth / 2)), //3
            this.getLinePosition(5, this.screen.getCenter().x + 210 + this.polygonWidth), //4
            this.getLinePosition(6, this.screen.getCenter().x + 210 + this.polygonWidth), //5
            this.getLinePosition(7, this.screen.getCenter().x + 300 + this.polygonWidth), //6
            this.getLinePosition(8, this.screen.getCenter().x + 300 + this.polygonWidth), //7
            this.getLinePosition(9, this.screen.getCenter().x + 210 + this.polygonWidth), //8
            this.getLinePosition(10, this.screen.getCenter().x + 210 + this.polygonWidth) //9
        ];
    }

}
