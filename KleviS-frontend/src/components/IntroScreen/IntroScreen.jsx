import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './IntroScreen.css';

const IntroScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Note: session storage logic can be re-enabled later. 
    // It is temporarily disabled so the user can easily test the animation.

    // 1. Wait a moment before starting the door animation to build suspense
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    // 2. Start fading out the entire scene after doors open and camera zooms
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3500);

    // 3. Completely unmount the component
    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    // In a real app, this would play/pause an actual HTML5 audio element
  };

  if (!shouldRender) return null;

  return (
    <div className={`intro-scene-wrapper ${isFadingOut ? 'fade-out' : ''}`}>
      {/* 3D Camera Container */}
      <div className={`intro-camera ${isOpen ? 'zoom-in' : ''}`}>
        
        {/* Background Interior of the store */}
        <div className="store-interior">
          {/* Using a high-quality Unsplash image of a luxury store interior */}
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Store Interior" 
            className="interior-image"
          />
          <div className="interior-overlay"></div>
        </div>

        {/* Storefront Facade */}
        <div className="store-facade">
          {/* Top Signboard */}
          <div className="store-signboard">
            <h1 className="signboard-text">KleviS.lk</h1>
          </div>

          {/* Double Glass Doors */}
          <div className="doors-container">
            {/* Left Door */}
            <div className={`glass-door left-door ${isOpen ? 'open' : ''}`}>
              <div className="door-handle left-handle"></div>
              <div className="glass-reflection"></div>
            </div>
            
            {/* Right Door */}
            <div className={`glass-door right-door ${isOpen ? 'open' : ''}`}>
              <div className="door-handle right-handle"></div>
              <div className="glass-reflection"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Optional UI: Ambient Music Toggle */}
      <button className="ambient-music-btn fade-in-delayed" onClick={toggleMute} aria-label="Toggle ambient music">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default IntroScreen;
