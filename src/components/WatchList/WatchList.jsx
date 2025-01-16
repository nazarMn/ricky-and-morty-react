import React, { useState } from 'react';
import './WatchList.css';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

  return (
    <div className="watchlist-container">
      <h1>My Watch List</h1>
      {watchList.length === 0 ? (
        <p>Your watch list is empty!</p>
      ) : (
        <ul>
          {watchList.map((item, index) => (
            <li key={index}>
              <h2>{item.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
