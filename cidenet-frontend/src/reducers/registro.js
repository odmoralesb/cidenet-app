import * as types from '../actions/types';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    empleado: {
        primer_apellido: null,
        segundo_apellido: null,
        primer_nombre: null,
        otros_nombres: null,
        pais: null,
        tipo_identificacion: null,
        identificacion: null,
        correo: null
    },
    paises: [],
    tipo_identificaciones: [],
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

        case types.OBTENER_PAISES:
            state = state.set('paises', Immutable.fromJS(action.payload));
            return state;

        case types.OBTENER_TIPO_IDENTIFICACIONES:
            state = state.set(
                'tipo_identificaciones',
                Immutable.fromJS(action.payload)
            );
            return state;

        case types.OBTENER_CORREOS_SIMILARES:
            state = state.set(
                'correos_similares',
                Immutable.fromJS(action.payload)
            );
            return state;

        default:
            return state;
    }
}
