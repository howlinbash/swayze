import React from 'react';
import './Marquee.css';

const Marquee = ({ onClick }) => (
  <div className="marquee" onClick={onClick} >
    <div className="marqueeText">
      SPLAT-A-PAT
    </div>
  </div>
);

export default Marquee;
