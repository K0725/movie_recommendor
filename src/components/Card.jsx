import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ title, imgSrc, description, genres }) => {
  return (
    <div className="Card">
      <h3>{title}</h3>
      <img src={imgSrc} alt={title} />
      <p>{description}</p>
      <p>Genres: {genres}</p>
      
      <Link to={'Edit/'}> 
        <h2 className="dot">...</h2>
      </Link>
    </div>
  );
};

export default Card;