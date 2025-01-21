import React from 'react';
import RickAndMorty from '/rick-and-morty.png';
import './HomePage.css';

export default function HomePage() {
  
  return (
    <div className="homePage">
      <div className="homePageLeft">
        <h2>Welkome to Rick and Morty</h2>


        <p>Get to know the characters of Rick and Morty</p>


        <button onClick={() => window.location.href = '/characters'}>Characters</button>

      </div>

      <div className="homePageRight"> 
        <img src={RickAndMorty} alt="1" />

      </div>

    </div>
  );
}
