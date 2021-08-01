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
                value: value === '' ? null : value
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
            dispatch({ type: types.REGISTRO_REALIZADO });
            mostrarMensaje(dispatch, {
                tipo: 'success',
                descripcion: 'Registro realizado con exito'
            });
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

export const getPaises = () => async (dispatch, getState) => {
    const axios = createAxiosInstance();
    axios
        .get(`${API_URL}/paises`)
        .then((response) => {
            const data = response.data.paises;
            dispatch({ type: types.OBTENER_PAISES, payload: data });
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

export const getTipoIdentificaciones = () => async (dispatch, getState) => {
    const axios = createAxiosInstance();
    axios
        .get(`${API_URL}/tipoidentificaciones`)
        .then((response) => {
            const data = response.data.tipo_identificacones;
            dispatch({
                type: types.OBTENER_TIPO_IDENTIFICACIONES,
                payload: data
            });
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
