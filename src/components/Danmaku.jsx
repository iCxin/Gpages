import React, { useEffect, useState, useRef } from 'react';
import { poems } from '../data';

const Danmaku = ({ show }) => {
  const [items, setItems] = useState([]);
  const tracksRef = useRef(Array(6).fill(true));

  useEffect(() => {
    if (!show) {
      setItems([]);
      return;
    }

    const spawn = () => {
      const availableTracks = tracksRef.current
        .map((val, idx) => (val ? idx : -1))
        .filter((val) => val !== -1);

      if (availableTracks.length === 0) return;

      const trackIndex = availableTracks[Math.floor(Math.random() * availableTracks.length)];
      const text = poems[Math.floor(Math.random() * poems.length)];
      
      const depth = Math.random();
      const scale = 0.8 + depth * 0.5;
      const opacity = 0.3 + depth * 0.5;
      const duration = 25 - depth * 10;

      const newItem = {
        id: Date.now() + Math.random(),
        text,
        style: {
          top: `${trackIndex * 15 + Math.random() * 5}%`,
          fontSize: `${scale}rem`,
          opacity,
          animationDuration: `${duration}s`,
          zIndex: Math.floor(scale * 100),
        },
      };

      setItems((prev) => [...prev, newItem]);

      // Occupy track
      tracksRef.current[trackIndex] = false;
      setTimeout(() => {
        tracksRef.current[trackIndex] = true;
      }, duration * 700);
    };

    // Initial burst
    const timeouts = [];
    for (let i = 0; i < 3; i++) {
      timeouts.push(setTimeout(spawn, i * 2000));
    }

    // Regular interval
    const interval = setInterval(spawn, 4500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [show]);

  const handleAnimationEnd = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div id="danmaku-container" className="danmaku-container">
      {items.map((item) => (
        <span
          key={item.id}
          className="danmaku-item"
          style={item.style}
          onAnimationEnd={() => handleAnimationEnd(item.id)}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default Danmaku;
