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

export const getCorreosSimilares = () => async (dispatch, getState) => {
    const axios = createAxiosInstance();

    const { primer_nombre, primer_apellido } = getState()
        .registro.get('empleado')
        .toJS();

    let apellido = primer_apellido;
    if (primer_apellido) {
        apellido = primer_apellido.split(' ');
        if (apellido.length === 2) {
            apellido = `${apellido[0]}${apellido[1]}`;
        } else if (apellido.length > 2) {
            apellido = `${apellido[0]}${apellido[1]}${apellido[2]}`;
        } else {
            apellido = apellido[0];
        }
    }
    const termino = `${primer_nombre}.${apellido}`;

    axios
        .get(`${API_URL}/buscar/correo/${termino}`)
        .then((response) => {
            const data = response.data.empleados.map((x) => {
                return x.correo;
            });
            dispatch({ type: types.OBTENER_CORREOS_SIMILARES, payload: data });
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
