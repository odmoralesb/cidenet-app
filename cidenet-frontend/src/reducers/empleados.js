import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LANZAR_MENSAJE_TOAST:
            return state;

        case types.MODIFICAR_INPUTS:
            state = state.setIn(
                `${action.payload.path}`.split('.'),
                Immutable.fromJS(action.payload.value)
            );
            return state;

        default:
            return state;
    }
}
