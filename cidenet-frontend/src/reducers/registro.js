import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    empleado: {
        primer_apellido: null,
        segundo_apellido: null,
        primer_nombre: null,
        otros_nombres: null,
        pais: null,
        tipo_identificacion: null
    },
    paises: [],
    tipo_identificaciones: []
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.MODIFICAR_INPUTS_REGISTRO:
            state = state.setIn(
                `${action.payload.path}`.split('.'),
                Immutable.fromJS(action.payload.value)
            );
            return state;

        case types.REGISTRO_REALIZADO:
            state = INITIAL_STATE;
            return state;

        case types.OBTENER_PAISES:
            state = state.set('paises', Immutable.fromJS(action.payload));
            return state;

        case types.OBTENER_TIPO_IDENTIFICACIONES:
            state = state.set(
                'tipo_identificaciones',
                Immutable.fromJS(action.payload)
            );
            return state;

        default:
            return state;
    }
}
