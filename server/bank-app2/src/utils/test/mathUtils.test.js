const { round } = require("../mathUtils");

describe('testRoundFunction', () => {
    test('testing with 3 decimals', () => {
        const num = 21.345;
        expect(round(num, 2)).toBe(21.34);
    });

    test('testing with string', () => {
        const num = 21.345;
        expect(round(num, '2')).toBe(21.34);
    });

    test('testing with 1 decimals', () => {
        const num = 21.3;
        expect(round(num, 2)).toBe(21.3);
    });

    test('testing with 0 decimals', () => {
        const num = 21;
        expect(round(num, 2)).toBe(21);
    });
});