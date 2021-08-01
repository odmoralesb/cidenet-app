import axios from 'axios';

import { API_URL } from '../actions/index';

export function createAxiosInstance() {
    let minConfig = {
        baseURL: API_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };

    return axios.create(minConfig);
}
