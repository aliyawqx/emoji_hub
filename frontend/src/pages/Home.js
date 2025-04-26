import React from 'react';
import EmojiBackground from '../components/EmojiBackground';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {}
      <EmojiBackground />
      
      <div className="center-content">
        <h1>Welcome to <br/> the Emoji Hub!</h1>
        <p>Explore a wide variety of emojis and their meanings.</p>
      </div>
    </div>
  );
}

export default Home;
