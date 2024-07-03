import { fetchRepositories, api } from './fetchRepositories';

jest.mock('./fetchRepositories', () => {
  const originalModule = jest.requireActual('./fetchRepositories');
  return {
    ...originalModule,
    api: {
      get: jest.fn(),
    },
  };
});

const mockedApiGet = api.get as jest.Mock;

describe('fetchRepositories', () => {
  const page = 1;
  const quantity = 10;

  beforeEach(() => {
    mockedApiGet.mockClear();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Network Error';
    mockedApiGet.mockRejectedValue(new Error(errorMessage));

    try {
      await fetchRepositories(page, quantity);
    } catch (error) {
      expect(mockedApiGet).toHaveBeenCalledWith('/search/repositories', {
        params: {
          q: 'javascript',
          sort: 'stars',
          per_page: quantity,
          page: page,
        },
        headers: {
          'User-Agent': 'request',
        },
      });
      if (error instanceof Error) {
        expect(error.message).toEqual(errorMessage);
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });
});
