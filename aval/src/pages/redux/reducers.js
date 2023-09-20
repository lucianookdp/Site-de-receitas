const initialState = {
    categories: [], 
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FILTER_ITEMS':
       
        return {
          ...state,
         
          activeCategory: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  