import axios, { AxiosResponse } from 'axios';
import { FetchRepositoriesResponse } from './fetchRepositories.type';
import { CONSTANT } from '../constants';

const { BASE_URL, REPO_URL } = CONSTANT.API;

export const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchRepositories = async (page: number, quantity: number): Promise<FetchRepositoriesResponse> => {
    const response: AxiosResponse<FetchRepositoriesResponse> = await api.get(REPO_URL, {
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
    return response.data;
};

