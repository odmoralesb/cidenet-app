import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    empleado: {
        primer_apellido: null,
        segundo_apellido: null,
        primer_nombre: null,
        otros_nombres: null
    }
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

        default:
            return state;
    }
}
