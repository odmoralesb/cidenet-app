import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    empleado: {
        primer_apellido: null
    }
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LANZAR_MENSAJE_TOAST:
            return state;

        case types.MODIFICAR_INPUTS_REGISTRO:
            const value = action.payload.value
                ? action.payload.value.toUpperCase()
                : '';
            state = state.setIn(
                `${action.payload.path}`.split('.'),
                Immutable.fromJS(value)
            );
            return state;

        default:
            return state;
    }
}
