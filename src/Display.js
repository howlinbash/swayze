import React from 'react';
import './Display.css';

const PointsBoard = ({ round }) => (
  <div className="display">
    <div className="message">
      {round ? `ROUND ${round}` : 'GAME OVER'}
    </div>
  </div>
);

export default PointsBoard;
