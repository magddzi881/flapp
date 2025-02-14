import React, { useEffect } from 'react';
import './FallingFlowers.css';

const flowerImages = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png', '/flower6.png',
  '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png', '/flower11.png', '/flower12.png'
];

const FallingFlowers = () => {
  useEffect(() => {
    const createFlower = () => {
      const flower = document.createElement('img');
      const flowerIndex = Math.floor(Math.random() * 12);
      flower.src = flowerImages[flowerIndex];
      flower.className = 'falling-flower';
      flower.style.left = `${Math.random() * 100}vw`;
      flower.style.animationDuration = `${Math.random() * 5 + 10}s`; 
      document.body.appendChild(flower);

      flower.addEventListener('animationend', () => {
        flower.remove();
      });
    };

    const interval = setInterval(createFlower, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default FallingFlowers;
