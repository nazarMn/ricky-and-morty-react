import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CharacterList from './components/CharacterList/CharacterList';
import Episodes from './components/Episodes/Episodes';
import Locations from './components/Locations/Locations';
import WatchList from './components/WatchList/WatchList';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/*"
            element={
              <>
                <nav>
                  <ul className="nav-links">
                    <li>
                      <Link to="/characters">Characters</Link>
                    </li>
                    <li>
                      <Link to="/episodes">Episodes</Link>
                    </li>
                    <li>
                      <Link to="/locations">Locations</Link>
                    </li>
                    <li>
                      <Link to="/watchlist">My Watch List</Link>
                    </li>
                  </ul>
                </nav>
                <Routes>
                  <Route path="/characters" element={<CharacterList />} />
                  <Route path="/episodes" element={<Episodes />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/watchlist" element={<WatchList />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
