import { assert, expect } from 'chai';
import Container from '../framework/Container';

describe('Container', () => {
    describe('getService(key)', () => {
        it ('should throw Error when window has no services', () => {
            expect(Container.getService).to.throw(Error, /Set services first/);
        });
        it ('should throw Error when an undefined service is requested', () => {
            window.service = {};
            expect(Container.getService).to.throw(Error, /The service you requested does not exist/);
        });
        it ('should return service', () => {
            window.service = {
                someService: {
                    some: 'really nice object'
                }
            };
            assert.equal(Container.getService('someService'), window.service.someService);
        });
        it ('should handle a function from a service', () => {
            window.service = {
                awesomeService: {
                    method: () => {
                        return 'owwwww yeah!'
                    }
                }
            };
            assert.equal(
                Container.getService('awesomeService').method(),
                'owwwww yeah!'
            );
        });
    });
    describe('setServices(services)', () => {
        it ('should be populated with services', () => {
            window.service = {
                firstService: {},
                secondService: {}
            };
            assert.equal(Container.getServices(), window.service);
        });
    });
});
