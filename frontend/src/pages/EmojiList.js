import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmojiList.css';

function EmojiList() {
  const [emojis, setEmojis] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); 

  useEffect(() => {
    let retries = 3;
    const fetchEmojis = () => {
      setLoading(true);
      axios.get('/emoji')
        .then(res => {
          setEmojis(res.data);
          setLoading(false); 
        })
        .catch(err => {
          if (retries > 0) {
            retries--;
            setTimeout(fetchEmojis, 5000);
          } else {
            console.error('Failed to fetch emojis after multiple attempts:', err);
            setLoading(false); 
          }
        });
    };

    fetchEmojis();

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteToggle = (emoji) => {
    const updatedFavorites = favorites.includes(emoji)
      ? favorites.filter(fav => fav !== emoji)
      : [...favorites, emoji];

    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filtered = emojis
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => (category === 'Favorites' ? favorites.includes(e.name) : category ? e.category === category : true))
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0);

  useEffect(() => {
    setNoResults(filtered.length === 0 && !loading);
  }, [filtered, loading]);

  return (
    <div className="container">
      <h1 className="title">Emoji Catalog</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="select-category"
        >
          <option value="">All Categories</option>
          <option value="Favorites">favorites</option>
          {[...new Set(emojis.map(e => e.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={() => setSortAZ(!sortAZ)}
          className={`sort-button ${sortAZ ? 'active' : ''}`}
        >
          {sortAZ ? 'Remove Sorting' : 'Sort A-Z'}
        </button>
      </div>

      {loading && <div className="loading-message">Loading...</div>}

      {noResults && !loading && <div className="no-results-message">No results found</div>}

      <div className="emoji-grid">
        {filtered.map((emoji, index) => (
          <div key={index} className="emoji-card">
            <div
              className="emoji-symbol"
              dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
            />
            <h3 className="emoji-name">{emoji.name}</h3>
            <p className="emoji-category">
              <strong>Category:</strong> {emoji.category}
            </p>
            <p className="emoji-group">
              <strong>Group:</strong> {emoji.group}
            </p>
            <button
              onClick={() => handleFavoriteToggle(emoji.name)}
              className={`favorite-button ${favorites.includes(emoji.name) ? 'active' : ''}`}
            >
              {favorites.includes(emoji.name) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmojiList;
