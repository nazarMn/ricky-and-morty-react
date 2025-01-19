import React, { useEffect, useState } from 'react';
import './WatchList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

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

  return (
    <div className="watchlist-container">
      <h1>My Watch List</h1>
      {watchList.length === 0 ? (
        <p>Your watch list is empty!</p>
      ) : (
        <ul>
          {watchList.map((item) => (
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
      )}
    </div>
  );
}
