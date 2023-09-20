import React from 'react';
import './Carousel.css';
import { Link } from 'react-router-dom';


function Carousel() {
  return (
    <div className="container-carousel">
      
      <Link to='/galeria' id="galeria" className="sectionn">
        <div className="contentt">
          <h1>Pedidos</h1>
        </div>
        <div className="overlay"></div>
      </Link>

      <Link to='/sobre' id="sobrenos" className="sectionn">
          <div className="contentt">
            <h1>Galeria</h1>
          </div>
          <div className="overlay"></div>
      </Link>
     
      <Link to='/cardapio' id="cardapio" className="sectionn">
        <div className="contentt">
          <h1>Cardapio</h1>
        </div>
        <div className="overlay"></div>
      </Link>
    
    </div>
  );
}

export default Carousel;
