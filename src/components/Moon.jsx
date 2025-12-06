import React, { useState } from 'react';

const Moon = () => {
  const [isOff, setIsOff] = useState(false);

  const toggleLights = () => {
    const newState = !isOff;
    setIsOff(newState);
    if (newState) {
      document.body.classList.add('lights-off');
      // Legacy code also toggles 'off' class on the moon element itself
    } else {
      document.body.classList.remove('lights-off');
    }
  };

  return (
    <div 
      className={`moon ${isOff ? 'off' : ''}`} 
      id="moon" 
      onClick={toggleLights}
    />
  );
};

export default Moon;