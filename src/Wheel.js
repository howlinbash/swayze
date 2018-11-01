import React from 'react';
import { pat, question } from './faces';
import './Wheel.css';

const Wheel = ({ isSpinning }) => (
  <div className="wheel">
    <div className="window a">
      <img src={isSpinning ? pat : question} />
    </div>
    <div className="window b">
      <img src={isSpinning ? pat : question} />
    </div>
    <div className="window c">
      <img src={isSpinning ? pat : question} />
    </div>
  </div>
);

export default Wheel;
