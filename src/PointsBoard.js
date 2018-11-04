import React from 'react';
import './PointsBoard.css';

const PointsBoard = ({ round }) => (
  <div className="pointsBoard">
    <div className="points">
      {round ? `ROUND ${round}` : 'GAME OVER'}
    </div>
  </div>
);

export default PointsBoard;
