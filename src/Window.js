import React from 'react';
import Face from './Face';
import { question } from './faces';
import './Window.css';

const Window = ({ focus, id, isSpinning }) => (
  <div className="window" key={id}>
    {isSpinning ? (
      focus === id ? <Face id={id} /> : null
    ) : (
      <img src={question} />
    )}
  </div>
)

export default Window;
