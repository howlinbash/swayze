import React from 'react';
import Face from './Face';
import { pat, question } from './faces';
import './Window.css';

const Window = ({ face, focus, id, isSpinning }) => {
  const guessMade = false;

  if (guessMade) {
    return (
      <div className="window" key={id}>
        <img src={face} />
      </div>
    )
  }

  return (
    <div
      className="window"
      key={id}
      onClick={() => console.log("window clicked", id)}
    >
      {isSpinning && !guessMade ? (
        focus === id ? <Face face={pat} id={id} /> : null
      ) : (
        <img src={question} />
      )}
    </div>
  )
};

export default Window;
