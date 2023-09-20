
import { combineReducers } from 'redux';
import contadorClientesReducer from './contadorClientesReducer'; // Importe seu novo reducer aqui

const rootReducer = combineReducers({
  // Outros reducers existentes
  contadorClientes: contadorClientesReducer, // Adicione seu novo reducer ao estado global
});

export default rootReducer;