// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

import lodash from 'lodash';
jest.mock('lodash');

describe('BankAccount', () => {
  const account = getBankAccount(1000);
  const accountB = getBankAccount(1);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(1001, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    account.withdraw(300);
    expect(account.getBalance()).toBe(1200);
  });

  test('should transfer money', () => {
    account.transfer(200, accountB);
    expect(accountB.getBalance()).toBe(201);
    expect(account.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    expect(await account.fetchBalance()).toBe(null);
    expect(async () => {
      await account.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
