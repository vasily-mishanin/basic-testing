// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { description: 'Add', a: 1, b: 2, action: Action.Add, expected: 3 },
  {
    description: 'Subtract',
    a: 12,
    b: 2,
    action: Action.Subtract,
    expected: 10,
  },
  {
    description: 'Multiply',
    a: 3,
    b: 7,
    action: Action.Multiply,
    expected: 21,
  },
  { description: 'Divide', a: 6, b: 4, action: Action.Divide, expected: 1.5 },
  {
    description: 'Exponentiate',
    a: 12,
    b: 2,
    action: Action.Exponentiate,
    expected: 144,
  },
  {
    description: 'Return null on Invalid Action',
    a: 1,
    b: 2,
    action: '$',
    expected: null,
  },
  {
    description: 'Return null on Invalid Arguments',
    a: '4d',
    b: 2,
    action: '$',
    expected: null,
  },
];

describe.each(testCases)(
  '%s %# simpleCalculator',
  ({ description, a, b, action, expected }) => {
    test(`${description} ${a} ${action} ${b} = ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);
