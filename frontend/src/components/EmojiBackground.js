import React from 'react';

const emojiList = ['😊', '🎉', '💖', '🔥', '🌈', '🍀', '✨', '🦄', '🥳', '🎶'];

function getRandomPosition(area) {
  const top = Math.random() * 90;
  const left = area === 'left' ? Math.random() * 45 : 55 + Math.random() * 45;
  return { top, left };
}

function EmojiBackground() {
  const leftEmojis = emojiList.slice(0, Math.ceil(emojiList.length / 2));
  const rightEmojis = emojiList.slice(Math.ceil(emojiList.length / 2));
  const placedPositions = [];

  function getSafePosition(area) {
    let position;
    let attempts = 0;
    do {
      position = getRandomPosition(area);
      attempts++;
    } while (
      placedPositions.some(p => Math.abs(p.top - position.top) < 10 && Math.abs(p.left - position.left) < 10) &&
      attempts < 10
    );
    placedPositions.push(position);
    return position;
  }

  return (
    <div className="emoji-background">
      {[...leftEmojis, ...rightEmojis].map((emoji, index) => {
        const area = index < leftEmojis.length ? 'left' : 'right';
        const { top, left } = getSafePosition(area);
        return (
          <span
            key={index}
            className="emoji"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

export default EmojiBackground;
