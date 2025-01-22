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
  const [filters, setFilters] = useState({
    status: 'all',
    species: 'all',
    gender: 'all',
  });

  useEffect(() => {
    fetchCharacters(page, filters);
  }, [page, filters]);

  const fetchCharacters = (page, filters) => {
    const params = {
      page,
      ...(filters.status !== 'all' && { status: filters.status }),
      ...(filters.species !== 'all' && { species: filters.species }),
      ...(filters.gender !== 'all' && { gender: filters.gender }),
    };

    axios
      .get('https://rickandmortyapi.com/api/character', { params })
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); 
  };

  return (
    <div className="character-list-container">
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
        >
          <option value="all">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="unknown">Unknown</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological">Mythological</option>
          <option value="Animal">Animal</option>
          <option value="Disease">Disease</option>
          <option value="Robot">Robot</option>
          <option value="Cronenberg">Cronenberg</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

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
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: { inset: '10%', padding: 0, display: 'flex', flexDirection: 'row', borderRadius: '18px' },
        }}
      >
        {characterInfo ? (
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
              <p>Origin: {characterInfo.origin?.name || 'Unknown'}</p>
              <p>Location: {characterInfo.location?.name || 'Unknown'}</p>
              <p>Episodes: {characterInfo.episode?.length || 0}</p>
              <p>Created: {characterInfo.created}</p>
            </div>
          </div>
        ) : (
          <p>Loading character details...</p>
        )}
      </Modal>
    </div>
  );
}
