import React, { useEffect, useState } from 'react';
import './Episodes.css';
import axios from 'axios';

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

  return (
    <div className="episodes-container">
      <h1>Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <h2>{episode.name}</h2>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
          </li>
        ))}
      </ul>
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
    </div>
  );
}
