import React, { Component } from 'react';
import { hilary, pat, will } from './faces';
import './Wheel.css';

const Wheel = () => (
  <div className="wheel">
    <div className="window a">
      <img src={hilary} />
    </div>
    <div className="window b">
      <img src={will} />
    </div>
    <div className="window c">
      <img src={pat} />
    </div>
  </div>
);

export default Wheel;
