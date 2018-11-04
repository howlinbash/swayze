import React from 'react';
import './Display.css';

const Display = ({ round }) => (
  <div className="display">
    <div className="message">
      {round ? `ROUND ${round}` : 'GAME OVER'}
    </div>
  </div>
);

export default Display;
