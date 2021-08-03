import { combineReducers } from 'redux';
import layoutReducer from './layout';
import empleadosReducer from './empleados';
import empleadoReducer from './empleado';

const appReducer = combineReducers({
    empleados: empleadosReducer,
    empleado: empleadoReducer,
    layout: layoutReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
