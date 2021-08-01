import * as types from './types';
import { createAxiosInstance } from '../utils/helpers';
import { API_URL } from '.';

import { mostrarMensaje } from './layout';

export function updateInputs(path, value) {
    return (dispatch) => {
        dispatch({
            type: types.MODIFICAR_INPUTS_REGISTRO,
            payload: {
                path,
                value: value == '' ? null : value
            }
        });
    };
}

export const registrar = () => async (dispatch, getState) => {
    const axios = createAxiosInstance();
    const empleado = getState().registro.get('empleado').toJS();
    axios
        .post(`${API_URL}/empleados`, empleado)
        .then((response) => {
            console.log('registro de empleado', response);
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            errors.map((x) => {
                mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: x.msg
                });
            });
        });
};
