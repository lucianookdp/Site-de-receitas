const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        // Lógica para atualizar o estado após o login bem-sucedido
        return { ...state, user: action.payload, loading: false, error: null };
      case 'SIGN_IN_ERROR':
        // Lógica para atualizar o estado em caso de erro no login
        return { ...state, user: null, loading: false, error: action.payload };
      // Outros casos e ações aqui...
      default:
        return state;
    }
  };
  