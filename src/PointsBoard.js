import React from 'react';
import rules from './rules';
import './PointsBoard.css';

const PointsBoard = ({ gameOver, round }) => (
  <div className="pointsBoard">
    <div className="points">
      {round ? `ROUND ${round}` : 'GAME OVER'}
    </div>
  </div>
);

export default PointsBoard;
