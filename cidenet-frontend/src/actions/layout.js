import * as types from './types';

export function mostrarMensaje(dispatch, msg) {
    dispatch({ type: types.MOSTRAR_MENSAJE, payload: msg });
}

export function limpiarMensaje() {
    return (dispatch) => {
        dispatch({ type: types.LIMPIAR_MENSAJE });
    };
}
