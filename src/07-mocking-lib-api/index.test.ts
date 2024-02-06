// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/some/realative/path';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

jest.mock('lodash', () => ({
  throttle: (fn: Function) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: { username: 'Alex' } }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual({ username: 'Alex' });
  });
});
