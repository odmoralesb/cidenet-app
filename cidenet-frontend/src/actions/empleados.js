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

export function limpiarFiltro() {
    return (dispatch) => {
        dispatch({
            type: types.LIMPIAR_FILTRO
        });
    };
}

export const getEmpleados = (page = 1, size = 10) => async (dispatch) => {
    const axios = createAxiosInstance();
    const from = (page - 1) * size;
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
            if (err.response && err.response.data) {
                const errors = err.response.data.errors;
                errors.map((x) => {
                    return mostrarMensaje(dispatch, {
                        tipo: 'danger',
                        descripcion: x.msg
                    });
                });
            } else {
                mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: 'Error de conexion'
                });
            }
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
            if (err.response && err.response.data) {
                const errors = err.response.data.errors;
                errors.map((x) => {
                    return mostrarMensaje(dispatch, {
                        tipo: 'danger',
                        descripcion: x.msg
                    });
                });
            } else {
                mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: 'Error de conexion'
                });
            }
        });
};

export const buscarEmpleados = (
    page = 1,
    size = 10,
    filtro = {
        termino: '',
        identificacion: '',
        tipo_identificacion: '',
        pais: '',
        estado: true
    }
) => async (dispatch) => {
    const axios = createAxiosInstance();
    const from = (page - 1) * size;
    axios
        .post(
            `${API_URL}/buscar/empleados?desde=${from}&limite=${size}`,
            filtro
        )
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
            if (err.response && err.response.data) {
                const errors = err.response.data.errors;
                errors.map((x) => {
                    return mostrarMensaje(dispatch, {
                        tipo: 'danger',
                        descripcion: x.msg
                    });
                });
            } else {
                mostrarMensaje(dispatch, {
                    tipo: 'danger',
                    descripcion: 'Error de conexion'
                });
            }
        });
};
