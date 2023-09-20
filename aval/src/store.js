import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Outros reducers podem ser adicionados aqui...
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
