import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EmojiList from './pages/EmojiList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">

        <nav className="navbar">
          <Link to="/">Home</Link> | <Link to="/emoji">Emoji Catalog</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emoji" element={<EmojiList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
