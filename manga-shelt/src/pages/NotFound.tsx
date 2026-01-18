import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Oops! Pagina non trovata</h2>
        <p>
          Sembra che tu stia cercando un capitolo che non è ancora stato disegnato... 
          o forse ti sei perso nel multiverso? 🌀
        </p>
        
        {/* Bottone per tornare a casa */}
        <Link to="/" className="home-btn">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;