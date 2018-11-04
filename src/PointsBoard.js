import React from 'react';
import rules from './rules';
import './PointsBoard.css';

const PointsBoard = ({ round }) => (
  <div className="pointsBoard">
    <div className="points">
      {`ROUND ${rules[round].round}`}
    </div>
  </div>
);

export default PointsBoard;
