import React from 'react';
import './Character.css';

export default function Character({ id, name, species, img, onClick }) {
  return (
    <div className="character" onClick={onClick}>
      <img src={img} alt={name} />
      <h1>{name}</h1>
      <p>{species}</p>
    </div>
  );
}
