import { DynamicEngine } from '../src/classes/dynamicengine';

describe('DynamicEngine', () => {
    let engine: DynamicEngine;
    let paths: string[];

    beforeEach(() => {
        engine = new DynamicEngine();
        paths = [
            '/static/path',
            '/dynamic/[param]/path',
            '/multiple/[param1]/and/[param2]',
            '/optional/[param1]?/path',
            '/special/[param]/path-with-*'
        ];
    });

    describe('matchDynamicPaths', () => {
        it('should correctly match static paths', () => {
            const url = '/static/path';
            const expected = { '/static/path': {} };
            const result = engine.matchDynamicPaths(paths, url);
            expect(result).toEqual(expected);
        });

        it('should correctly match and extract parameters from dynamic paths', () => {
            const testCases = [
                { url: '/dynamic/value/path', expected: { '/dynamic/[param]/path': { param: 'value' } } },
                { url: '/multiple/one/and/two', expected: { '/multiple/[param1]/and/[param2]': { param1: 'one', param2: 'two' } } }
            ];

            testCases.forEach(({ url, expected }) => {
                const result = engine.matchDynamicPaths(paths, url);
                expect(result).toEqual(expected);
            });
        });

        it('should handle optional parameters correctly', () => {
            const testCases = [
                { url: '/optional/value/path', expected: { '/optional/[param1]?/path': { param1: 'value' } } },
                { url: '/optional//path', expected: { '/optional/[param1]?/path': {} } } // Assuming the engine is designed to match this pattern
            ];

            testCases.forEach(({ url, expected }) => {
                const result = engine.matchDynamicPaths(paths, url);
                expect(result).toEqual(expected);
            });
        });

        it('should return an empty object for non-matching paths', () => {
            const url = '/non/matching/path';
            const expected = {};
            const result = engine.matchDynamicPaths(paths, url);
            expect(result).toEqual(expected);
        });

    });
});