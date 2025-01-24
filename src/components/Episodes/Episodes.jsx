import React, { useEffect, useState } from 'react';
import './Episodes.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const fetchEpisodes = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((response) => {
        setEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const saveEpisodeToLocalStorage = (episode) => {
    const savedEpisodes = JSON.parse(localStorage.getItem('savedEpisodes')) || [];
    const isAlreadySaved = savedEpisodes.some((saved) => saved.id === episode.id);
  
    if (!isAlreadySaved) {
      const episodeToSave = {
        id: episode.id,
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode,
      };
      savedEpisodes.push(episodeToSave);
      localStorage.setItem('savedEpisodes', JSON.stringify(savedEpisodes));
      alert(`${episode.name} saved to Local Storage!`);
    } else {
      alert(`${episode.name} is already saved!`);
    }
  };
  

  return (
    <div className="episodes-container">
      <h1>Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <h2>{episode.name}</h2>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
            <button 
              className="save-episode-button" 
              onClick={() => saveEpisodeToLocalStorage(episode)}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
