import * as types from './types';
import { createAxiosInstance } from '../utils/helpers';

import { API_URL } from '.';

import { mostrarMensaje } from './layout';

export function lanzar_mensaje(mensaje) {
    return (dispatch) => {
        mostrarMensaje(dispatch, {
            tipo: 'info',
            descripcion: mensaje
        });
    };
}

export function updateInputs(path, value) {
    return (dispatch) => {
        dispatch({
            type: types.MODIFICAR_INPUTS,
            payload: {
                path,
                value: value == '' ? null : value
            }
        });
    };
}
