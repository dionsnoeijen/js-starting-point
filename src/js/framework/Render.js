'use strict';

export default class Render {

    static store(html) {
        if (html === undefined) {
            throw Error('No html defined');
        }
        let result = {
            appended: [],
            deleted: []
        };
        if (this.renderedComponentIds === undefined) {
            this.renderedComponentIds = [];
        }
        let proposed = Array.from(html.querySelectorAll('*'));
        let proposedIds = [];
        proposed.map(component => {
            let id = component.getAttribute('id');
            if (id !== null && id !== undefined) {
                if (this.renderedComponentIds.indexOf(id) < 0) {
                    this.renderedComponentIds.push(id);
                    result.appended.push(id);
                }
                proposedIds.push(id);
            }
            return false;
        });
        result.deleted = this.renderedComponentIds.filter(id => {
            if (proposedIds.indexOf(id) < 0) {
                return id;
            }
            return false;
        });
        return result;
    }

    static unStore(ids) {
        for (let key in ids) {
            let index = this.renderedComponentIds.indexOf(ids[key]);
            if (index > -1) {
                this.renderedComponentIds.splice(index, 1);
            }
        }
    }

    static deleteComponents(components, keep) {
        for (let key in keep) {
            let index = components.indexOf(keep[key]);
            if (index > -1) {
                components.splice(index, 1);
            }
        }
        if (components.length > 0) {
            for (let i in components) {
                if (components.hasOwnProperty(i)) {
                    let removeElement = document.getElementById(components[i]);
                    if (removeElement !== null) {
                        removeElement.parentNode.removeChild(removeElement);
                        this.unStore(components);
                    }
                }
            }
        }
    }

    static getParent(html, forElement) {
        let parent = html.querySelector('#' + forElement).parentElement;
        if (parent === null) {
            return document.body;
        }
        return document.querySelector('#' + parent.getAttribute('id'));
    }

    static toScreen(component, keep = []) {
        let html = this.parseHTML(component.render().join(''));
        let store = this.store(html);
        if (store.appended.length > 0) {
            let appendToParent = this.getParent(html, store.appended[0]);
            if (appendToParent !== null) {
                html = html.querySelector('#' + store.appended[0]);
            }
            appendToParent.appendChild(html);
        }
        if (store.deleted.length > 0) {
            this.deleteComponents(store.deleted, keep);
        }
    }

    static parseHTML(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.cloneNode(true);
    }
}
