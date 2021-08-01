import { combineReducers } from 'redux';
import layoutReducer from './layout';
import empleadosReducer from './empleados';

const appReducer = combineReducers({
    empleados: empleadosReducer,
    layout: layoutReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
