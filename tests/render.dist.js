'use strict';

import { assert, expect } from 'chai';
import Render from '../src/js/framework/Render';
import jsdom from 'mocha-jsdom';

describe('Render', () => {
    describe('store(html)', () => {
        it ('should throw Error when no html is provided', () => {
            expect(Render.store).to.throw(Error, /No html defined/);
        });
        it ('should create the rendered component ids property', () => {
            expect(Render).not.to.have.property('renderedComponentIds');
            let html = '<div><h1>Amazing</h1><p>Give me some</p></div>';
            let template = document.createElement('template');
            template.innerHTML = html;
            Render.store(template.content.cloneNode(true));
            expect(Render).to.have.property('renderedComponentIds').and.deep.equal([]);
        });
        it ('should return a result object with two empty arrays', () => {
            let html = '<div><h1>Amazing</h1><p>Give me some</p></div>';
            let template = document.createElement('template');
            template.innerHTML = html;
            let result = Render.store(template.content.cloneNode(true));
            assert.isObject(result);
            expect(result).to.have.property('appended').and.deep.equal([]);
            expect(result).to.have.property('deleted').and.deep.equal([]);
        });
        it ('should have added components to added and not to deleted', () => {
            let html = '<div id="wrap"><div id="me"><div id="up"><div id="scotty"></div></div></div></div>';
            let template = document.createElement('template');
            template.innerHTML = html;
            let result = Render.store(template.content.cloneNode(true));
            assert.isObject(result);
            expect(result).to.have.property('appended').and.deep.equal([ 'wrap', 'me', 'up', 'scotty' ]);
            expect(result).to.have.property('deleted').and.deep.equal([]);
        });
        it ('should add a component to deleted', () => {
            let html = '<div id="wrap"><div id="me"></div></div></div>';
            let template = document.createElement('template');
            template.innerHTML = html;
            let result = Render.store(template.content.cloneNode(true));
            assert.isObject(result);
            expect(result).to.have.property('appended').and.deep.equal([]);
            expect(result).to.have.property('deleted').and.deep.equal([ 'up', 'scotty' ]);
        });
        it ('should have components in renderedComponentIds', () => {
            expect(Render).to.have.property('renderedComponentIds').and.deep.equal([ 'wrap', 'me', 'up', 'scotty' ]);
        });
        it ('should only append items that were not present before', () => {
             let html = '<div id="wrap"><div id="me"><div id="up"><div id="scotty"><div id="andaddme"></div></div></div></div></div>';
             let template = document.createElement('template');
             template.innerHTML = html;
             let result = Render.store(template.content.cloneNode(true));
             assert.isObject(result);
             expect(result).to.have.property('appended').and.deep.equal([ 'andaddme' ]);
             expect(result).to.have.property('deleted').and.deep.equal([]);
        });
    });
    describe('unStore(ids)', () => {
        it ('should unstore ids', () => {
            Render.renderedComponentIds = [
                'i', 'will', 'just', 'cheat', 'those', 'in'
            ];
            Render.unStore([
                'i', 'will', 'just'
            ]);
            expect(Render.renderedComponentIds).to.deep.equal([ 'cheat', 'those', 'in' ]);
        });
    });
    describe('deleteComponents(components, keep)', () => {
        it ('should delete components from document', () => {
            let html = '<div id="something"><div id="that"><div id="i"><div id="want"><div id="to"><div id="delete"></div></div></div></div></div></div>';

            let body = window.document.createElement('body');
            body.innerHTML = html;

            let divs = window.document.getElementsByName('div');

            Array.from(document.getElementsByClassName("events")).forEach(function(item) {
                console.log('', item);
            });

            Render.deleteComponents(['to']);
        });
    });
});
