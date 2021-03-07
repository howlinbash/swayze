import React from 'react';
import Window from './Window';
import './Wheel.css';

const Wheel = ({ answer, requestStartSpin, faces }) => {
  const focus = "";
  const isSpinning = false;
  const windows = [
    {id: 'alpha'},
    {id: 'beta'},
    {id: 'charlie'}
  ];

  return (
    <div className="wheel">
      {windows.map(({id}) => (
        <Window
          answer={answer}
          face={faces[id]}
          focus={focus}
          id={id}
          isSpinning={isSpinning}
          key={id}
        />
      ))}
    </div>
  );
};

export default Wheel;
