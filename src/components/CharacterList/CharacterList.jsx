import React, { useEffect, useState } from 'react';
import './CharacterList.css';
import axios from 'axios';
import Modal from 'react-modal';
import Character from '../Character/Character';

Modal.setAppElement('#root');

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  };

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="character-list-container">
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
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)'},
          content: { inset: '10%', padding: 0, display: 'flex', flexDirection: 'row', borderRadius: '18px' },
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
            <p>Origin: {characterInfo.origin.name}</p>
            <p>Location: {characterInfo.location.name}</p>
            <p>Episodes: {characterInfo.episode.length}</p>
            <p>Created: {characterInfo.created}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
