import React, { useEffect, useState } from 'react';
import './Locations.css';
import axios from 'axios';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchLocations(page);
  }, [page]);

  const fetchLocations = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then((response) => {
        setLocations(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="locations-container">
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
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
