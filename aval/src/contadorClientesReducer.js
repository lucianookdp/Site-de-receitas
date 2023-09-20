const initialState = {
    contadorClientes: 0,
  };
  
  const contadorClientesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENTAR_CLIENTE':
        return { ...state, contadorClientes: state.contadorClientes + 1 };
      default:
        return state;
    }
  };
  
  export default contadorClientesReducer;