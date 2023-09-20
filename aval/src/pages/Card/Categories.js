import React from 'react';
import { connect } from 'react-redux';
import { filterItems } from '../redux/actions'; 

const Categories = ({ categories, activeCategory, filterItems }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={`filter-btn ${category === activeCategory ? 'active' : ''}`}
            key={index}
            // Chama a função filterItems quando o botão é clicado
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}         

const mapStateToProps = (state) => ({
  categories: state.categories, 
  activeCategory: state.activeCategory, 
});

const mapDispatchToProps = {
  filterItems, 
};

export default Categories;
