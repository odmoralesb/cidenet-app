import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    mensaje: null
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.MOSTRAR_MENSAJE:
            state = state.set('mensaje', Immutable.fromJS(action.payload));
            return state;

        case types.LIMPIAR_MENSAJE:
            state = state.set('mensaje', null);
            return state;

        default:
            return state;
    }
}
