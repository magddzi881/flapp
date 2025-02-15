import React, { useState, useEffect } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
import FallingFlowers from './FallingFlowers';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function App() {
  const sendEmail = () => {
    const templateParams = {
      to_name: 'Me',
      message: 'Button 1 was clicked!',
    };

    emailjs.send('service_83rytxw', 'template_eemfq99', templateParams, 'sHThxjavMImBaZ2Im')
      .then((response) => {
        console.log('SUCCESS', response.status, response.text);
      }, (error) => {
        console.log('FAILED', error);
      });

    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.button-container').classList.add('hidden');
    const header2 = document.querySelector('.header2');
    header2.textContent = ';))';
    header2.classList.add('centered');
  };

  const [button2Style, setButton2Style] = useState({});
  const [button2Size, setButton2Size] = useState({ width: 100, height: 50, fontSize: 16 }); 
  const [isMuted, setIsMuted] = useState(true);
  const [audio, setAudio] = useState(null);

  const teleportButton = () => {
    let randomX, randomY;
    const button1 = document.querySelector('.button-container button:first-child');
    const button1Rect = button1.getBoundingClientRect();

    do {
      randomX = Math.floor(Math.random() * window.innerWidth);
      randomY = Math.floor(Math.random() * window.innerHeight);
    } while (
      randomX >= button1Rect.left && randomX <= button1Rect.right &&
      randomY >= button1Rect.top && randomY <= button1Rect.bottom
    );

    setButton2Style({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      width: `${button2Size.width}px`,
      height: `${button2Size.height}px`,
      fontSize: `${button2Size.fontSize}px`,
    });

    setButton2Size({
      width: button2Size.width * 0.9, 
      height: button2Size.height * 0.9, 
      fontSize: button2Size.fontSize * 0.9, 
    });
  };

  const toggleMute = () => {
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const newAudio = new Audio(require('./melody.mp3'));
    newAudio.loop = true;
    newAudio.muted = true; 
    setAudio(newAudio);

    newAudio.play().then(() => {
      newAudio.muted = isMuted; 
    }).catch(error => console.error('Audio play failed:', error));

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, [isMuted]);

  return (
    <div className="app">
      <FallingFlowers />
      <h1 className="header">Will you go on a date?</h1>
      <h2 className="header2"> (with me) </h2>
      <div className="button-container">
        <button className="button" onClick={sendEmail}>Yes</button>
        <button className="button" style={button2Style} onClick={teleportButton}>No</button>
      </div>
      <button 
        className="mute-button" 
        onClick={toggleMute} 
        style={{ backgroundColor: 'transparent', position: 'fixed', top: '10px', right: '10px', border: 'none', cursor: 'pointer' }}
      >
        {isMuted ? <FaVolumeMute color="pink" size="24" /> : <FaVolumeUp color="pink" size="24" />}
      </button>
    </div>
  );
}

export default App;
