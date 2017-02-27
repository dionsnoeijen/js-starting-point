'use strict';

import chai, { assert, expect } from 'chai';
import spies from 'chai-spies';
import { addObservable, dispatch, getState, state, actions, observe } from '../src/js/framework/State';

chai.use(spies);

describe('State', () => {

    let action = 'someListener';
    let observable = {
        [ action ]: () => {
            return 'Awwwieee!';
        }
    };

    describe('addObservable(observeMe)', () => {
        it('should add an observable object', () => {
            addObservable(observable);
            assert.equal(observe[0], observable);
        });
        it('should contain one observable', () => {
            assert.equal(observe.length, 1);
        });
    });

    describe('dispatch(addState)', () => {
        let data = {
            title: 'Some title',
            subTitle: 'With a subtitle'
        };
        it('should update the state', () => {
            dispatch({
                data: data
            });
            assert.deepEqual(getState(), data);
        });
        it('should add items to the state', () => {
            let addData = {
                addedTitle: 'Added title',
                addedSubTitle: 'Added subtitle'
            };
            let compare = Object.assign(data, addData);
            dispatch({
                data: addData
            });
            assert.deepEqual(state, compare);
        });
        it('should call the listener on the observed object', () => {
            let spy = chai.spy.on(observable, action);
            dispatch({
                listener: action
            });
            expect(spy).to.have.been.called.once;
        });
    });
});
