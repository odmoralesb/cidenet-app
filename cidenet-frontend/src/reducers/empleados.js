import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    data: [],
    pagination: {
        page: 1,
        total: 0,
        size: 10
    }
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.MODIFICAR_INPUTS_BUSQUEDA:
            state = state.setIn(
                `${action.payload.path}`.split('.'),
                Immutable.fromJS(action.payload.value)
            );
            return state;

        case types.OBTENER_EMPLEADOS:
            state = state.set('data', Immutable.fromJS(action.payload.data));
            state = state.setIn(
                ['pagination', 'page'],
                Immutable.fromJS(action.payload.page)
            );
            state = state.setIn(
                ['pagination', 'total'],
                Immutable.fromJS(action.payload.total)
            );
            state = state.setIn(
                ['pagination', 'size'],
                Immutable.fromJS(action.payload.size)
            );
            return state;

        default:
            return state;
    }
}
