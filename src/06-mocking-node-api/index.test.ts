// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const pathJoinMock = jest.fn((...args: string[]) => args.join('/'));
require('path').join = pathJoinMock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.restoreAllMocks();
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.advanceTimersByTime(2000);

    expect(callback).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });
});

//////

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'exampleFile.txt';
    // const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    // expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    expect(pathJoinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent-file.txt';
    require('fs').existsSync = jest.fn(() => false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'exampleExistingFile.txt';
    require('fs').existsSync = jest.fn(() => true);
    require('fs/promises').readFile = jest
      .fn()
      .mockResolvedValue('File read content.');
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe('File read content.');
  });
});
