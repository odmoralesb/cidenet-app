import axios from 'axios';

import { API_URL } from '../actions/index';

export function createAxiosInstance() {
    let minConfig = {
        baseURL: API_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json'
        }
    };

    return axios.create(minConfig);
}
