import React, { createContext, useState } from 'react';

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const triggerLogoutAnimation = () => {
    setIsLoggingOut(true);
  };

  const resetAnimation = () => {
    setIsLoggingOut(false);
  };

  return (
    <AnimationContext.Provider value={{ isLoggingOut, triggerLogoutAnimation, resetAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};
