import React from 'react';
import './Home.css';
import EmojiBackground from '../components/EmojiBackground';

function Home() {
  return (
    <div className="home-container">
      {}
      <EmojiBackground/>
      <div className="center-content">
        <h1>Welcome to <br/> the Emoji Hub!</h1>
        <p>Explore a wide variety of emojis and their meanings.</p>
      </div>
    </div>
  );
}

export default Home;
