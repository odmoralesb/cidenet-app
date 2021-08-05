import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    info: {
        primer_apellido: null,
        segundo_apellido: null,
        primer_nombre: null,
        otros_nombres: null,
        pais: null,
        tipo_identificacion: null,
        identificacion: null,
        correo: null,
        fechaIngreso: null,
        fechaRegistro: null,
        uid: null,
        area: null
    },
    paises: [],
    tipo_identificaciones: [],
    areas: [],
    correos_similares: []
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
            const paises = state.get('paises');
            const tipo_identificaciones = state.get('tipo_identificaciones');
            state = INITIAL_STATE;
            state = state.set('paises', paises);
            state = state.set('tipo_identificaciones', tipo_identificaciones);
            return state;

        case types.OBTENER_EMPLEADO:
            state = state.set('info', Immutable.fromJS(action.payload));
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

        case types.OBTENER_AREAS:
            state = state.set('areas', Immutable.fromJS(action.payload));
            return state;

        case types.OBTENER_CORREOS_SIMILARES:
            state = state.set(
                'correos_similares',
                Immutable.fromJS(action.payload)
            );
            return state;

        case types.LIMPIAR_INFO:
            state = state.set(
                'info',
                Immutable.fromJS(INITIAL_STATE.get('info'))
            );
            return state;

        default:
            return state;
    }
}
