// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  mockOne: () => {},
  mockTwo: () => {},
  mockThree: () => {},
  unmockedFunction:
    jest.requireActual<typeof import('./index')>('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });
});
