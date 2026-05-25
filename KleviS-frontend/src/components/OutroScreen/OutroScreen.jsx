import React, { useState, useEffect } from 'react';
import './OutroScreen.css';

const OutroScreen = ({ isLoggingOut }) => {
  const [isActive, setIsActive] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isFadingToBlack, setIsFadingToBlack] = useState(false);

  useEffect(() => {
    if (isLoggingOut) {
      // 1. Immediately become visible and block clicks
      setIsActive(true);
      
      // 2. Wait a tiny bit, then swing the doors shut and zoom out camera
      const closeTimer = setTimeout(() => {
        setIsClosed(true);
      }, 100); // 100ms delay to ensure the opacity=1 transition happens first

      // 3. Fade to black right at the end (when doors shut)
      const blackTimer = setTimeout(() => {
        setIsFadingToBlack(true);
      }, 2600); // doors take 2.5s to shut

      return () => {
        clearTimeout(closeTimer);
        clearTimeout(blackTimer);
      };
    } else {
      // Reset state if not logging out
      setIsActive(false);
      setIsClosed(false);
      setIsFadingToBlack(false);
    }
  }, [isLoggingOut]);

  if (!isLoggingOut && !isActive) return null;

  return (
    <div className={`outro-scene-wrapper ${isActive ? 'active' : ''}`}>
      
      <div className={`outro-camera ${isClosed ? 'zoom-out' : ''}`}>
        
        {/* Blurred Background inside store */}
        <div className="store-interior-outro">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070" 
            alt="Store Interior" 
            className="interior-image-outro"
          />
          <div className="interior-overlay-outro"></div>
        </div>

        {/* 3D Glass Doors and Frame */}
        <div className="store-facade-outro">
          
          <div className="store-signboard-outro">
            <h1 className="signboard-text">KleviS</h1>
          </div>

          <div className="doors-container-outro">
            
            {/* Left Door */}
            <div className={`glass-door-outro left-door-outro ${isClosed ? 'closed' : ''}`}>
              <div className="glass-reflection-outro"></div>
              <div className="door-handle-outro left-handle-outro"></div>
            </div>

            {/* Right Door */}
            <div className={`glass-door-outro right-door-outro ${isClosed ? 'closed' : ''}`}>
              <div className="glass-reflection-outro"></div>
              <div className="door-handle-outro right-handle-outro"></div>
            </div>

          </div>
        </div>

      </div>

      <div className={`outro-fade-to-black ${isFadingToBlack ? 'active' : ''}`}></div>

    </div>
  );
};

export default OutroScreen;
