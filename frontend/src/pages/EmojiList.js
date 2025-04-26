import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmojiList.css';

function EmojiList() {
  const [emojis, setEmojis] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortAZ, setSortAZ] = useState(false);

  useEffect(() => {
    let retries = 3;
    const fetchEmojis = () => {
      axios.get('/emoji')
        .then(res => setEmojis(res.data))
        .catch(err => {
          if (retries > 0) {
            retries--;
            setTimeout(fetchEmojis, 5000);
          } else {
            console.error('Failed to fetch emojis after multiple attempts:', err);
          }
        });
    };
  
    fetchEmojis();
  }, []);

  const filtered = emojis
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => (category ? e.category === category : true))
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0);

  return (
    <div className="container">
      <h1 className="title">Emoji Catalog</h1>
      <h1>Hello world</h1>

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

      {/* <div className="emoji-grid">
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
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default EmojiList;