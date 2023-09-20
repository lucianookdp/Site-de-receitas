export const filterItems = (category) => {
    return {
      type: 'FILTER_ITEMS',
      payload: category,
    };
  };