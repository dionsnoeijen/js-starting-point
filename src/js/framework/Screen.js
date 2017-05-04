'use strict';

export default class Screen {

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.eventListeners = [];
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        let event = new CustomEvent('resize');
        this.dispatchEvent(event);
    }

    getSize() {
        return {
            x: this.width,
            y: this.height
        }
    }

    getCenter() {
        return {
            x: this.width / 2,
            y: this.height / 2
        }
    }

    addEventListener(type, eventHandler) {
        let listener = {};
        listener.type = type;
        listener.eventHandler = eventHandler;
        this.eventListeners.push(listener);
    }

    dispatchEvent(event) {
        for (let i = 0; i < this.eventListeners.length; i++) {
            if (event.type == this.eventListeners[i].type) {
                this.eventListeners[i].eventHandler(event);
            }
        }
    }
}
