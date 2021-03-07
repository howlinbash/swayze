import React from 'react';
import Marquee from './Marquee';
import Display from './Display';
import Wheel from './Wheel';
import rules from './rules';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="machine">
        <Marquee onClick={() => console.log("marquee clicked")} />
        <div className="console">
          <Display
            answer={null}
            attempt={0}
            gameOver={true}
            isSpinning={false}
            jeff={false}
            round={0}
          />
          <Wheel
            answer={null}
            requestStartSpin={false}
            faces={rules[0]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
