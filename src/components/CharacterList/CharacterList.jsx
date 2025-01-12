import React, { useEffect, useState } from 'react';
import './CharacterList.css';
import axios from 'axios';
import Modal from 'react-modal';
import Character from '../Character/Character';

Modal.setAppElement('#root');

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const getCharacterInfo = (id) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacterInfo(response.data);
        setIsOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching character info:', error);
      });
  };

  return (
    <div className="character-list">
      {characters.map((character) => (
        <Character
          key={character.id}
          id={character.id}
          name={character.name}
          species={character.species}
          img={character.image}
          onClick={() => getCharacterInfo(character.id)}
        />
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: { inset: '10%', padding: 0, display: 'flex', flexDirection: 'row' },
        }}
      >
        <div className="modal-content">
          <img src={characterInfo.image} alt={characterInfo.name} className="modal-image" />
          <div className="modal-text">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <h2>{characterInfo.name}</h2>
            <p>Species: {characterInfo.species}</p>
            <p>Status: {characterInfo.status}</p>
            <p>Gender: {characterInfo.gender}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
