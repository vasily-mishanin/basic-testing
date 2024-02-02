// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: -10, action: Action.Add })).toBe(-5);
    expect(simpleCalculator({ a: 5, b: 110, action: Action.Add })).toBe(115);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 10, action: '-' })).toBe(5);
    expect(simpleCalculator({ a: 5, b: 110, action: '-' })).toBe(-105);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 10, action: '*' })).toBe(150);
    expect(simpleCalculator({ a: 5.5, b: 100, action: '*' })).toBe(550);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 3, action: '/' })).toBe(5);
    expect(simpleCalculator({ a: 6, b: -1.5, action: '/' })).toBe(-4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: '^' })).toBe(27);
    expect(
      simpleCalculator({ a: -11, b: 2, action: Action.Exponentiate }),
    ).toBe(121);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 15, b: 3, action: '!' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 15, b: '3', action: '+' })).toBe(null);
  });
});
