import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './WatchList.css';
import Pagination from '../Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef();

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const savedEpisodes = JSON.parse(localStorage.getItem('savedEpisodes')) || [];
    setWatchList(savedEpisodes);
  }, []);

  const updateLocalStorage = (newList) => {
    localStorage.setItem('savedEpisodes', JSON.stringify(newList));
    setWatchList(newList);
  };

  const markAsWatched = (id) => {
    const updatedList = watchList.map((item) =>
      item.id === id ? { ...item, watched: !item.watched } : item
    );
    updateLocalStorage(updatedList);
  };

  const deleteEpisode = (id) => {
    const updatedList = watchList.filter((item) => item.id !== id);
    updateLocalStorage(updatedList);
  };

  const fetchEpisodes = async (query = '') => {
    setLoading(true);
    try {
      const url = `https://rickandmortyapi.com/api/episode?page=1`;
      const { data } = await axios.get(url);

      const filteredEpisodes = data.results.filter((episode) =>
        episode.name.toLowerCase().includes(query.toLowerCase())
      );

      setEpisodes(filteredEpisodes);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() && showPopup) fetchEpisodes(searchQuery);
  }, [searchQuery, showPopup]);

  const addToWatchList = (episode) => {
    if (watchList.find((item) => item.id === episode.id)) {
      alert('Episode is already in your watchlist.');
      return;
    }
    const newEpisode = { ...episode, watched: false };
    const updatedList = [...watchList, newEpisode];
    updateLocalStorage(updatedList);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = watchList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(watchList.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="watchlist-container">
      <h1>My Watch List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for episodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setShowPopup(true)}
          className="search-input"
        />
        {showPopup && (
          <div className="popup-container" ref={popupRef}>
            {loading ? (
              <p>Loading episodes...</p>
            ) : episodes.length > 0 ? (
              <ul className="popup-list">
                {episodes.map((item) => (
                  <li key={item.id} className="popup-item">
                    <div>
                      <h3>{item.name}</h3>
                      <p>Air Date: {item.air_date}</p>
                      <p>Episode: {item.episode}</p>
                    </div>
                    <button className="add-button" onClick={() => addToWatchList(item)}>
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No episodes found</p>
            )}
          </div>
        )}
      </div>
      {watchList.length > 0 && (
        <div>
          <h2>Your Watch List</h2>
          <ul>
            {currentItems.map((item) => (
              <li key={item.id} className="watchlist-item">
                <div className="item-header">
                  <h2>{item.name}</h2>
                  <div className="button-group">
                    <FontAwesomeIcon
                      icon={item.watched ? faEye : faEyeSlash}
                      className={`icon ${item.watched ? 'watched' : ''}`}
                      onClick={() => markAsWatched(item.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="icon delete"
                      onClick={() => deleteEpisode(item.id)}
                    />
                  </div>
                </div>
                <p>Air Date: {item.air_date}</p>
                <p>Episode: {item.episode}</p>
                <p>Status: {item.watched ? 'Watched' : 'Not Watched'}</p>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
