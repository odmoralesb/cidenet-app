import { combineReducers } from 'redux';
import layoutReducer from './layout';
import empleadosReducer from './empleados';
import registroReducer from './registro';

const appReducer = combineReducers({
    empleados: empleadosReducer,
    registro: registroReducer,
    layout: layoutReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
