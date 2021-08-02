import * as types from './types';
import { createAxiosInstance } from '../utils/helpers';

import { API_URL } from '.';

import { mostrarMensaje } from './layout';

export function updateInputs(path, value) {
    return (dispatch) => {
        dispatch({
            type: types.MODIFICAR_INPUTS_BUSQUEDA,
            payload: {
                path,
                value: value == '' ? null : value
            }
        });
    };
}

export const getEmpleados = (page = 1, size = 10) => async (dispatch) => {
    const axios = createAxiosInstance();
    const from = (page - 1) * size + 1;
    axios
        .get(`${API_URL}/empleados?desde=${from}&limite=${size}`)
        .then((response) => {
            const data = response.data;
            dispatch({
                type: types.OBTENER_EMPLEADOS,
                payload: {
                    data: response.data.empleados,
                    total: response.data.total,
                    page,
                    size
                }
            });
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            console.log(err.response);
            errors.map((x) => {
                return mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: x.msg
                });
            });
        });
};

export const deleteEmpleados = (id) => async (dispatch, getState) => {
    const axios = createAxiosInstance();
    const { page, size } = getState().empleados.get('pagination').toJS();
    axios
        .delete(`${API_URL}/empleados/${id}`)
        .then((response) => {
            dispatch(getEmpleados(page, size));
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            errors.map((x) => {
                return mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: x.msg
                });
            });
        });
};
