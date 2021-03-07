import React from 'react';
import './Display.css';

const Display = ({ answer, attempt, gameOver, isSpinning, jeff, round }) => {
  const message = "SPIN THE WHEEL"
  return (
    <div className="display">
      <div className="message">
        {jeff ? 'TRIPLE JEFF - OHMIGOD!' : message}
      </div>
    </div>
  );
};

export default Display;
