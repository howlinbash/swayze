import React, { Component } from 'react';
import Wheel from './Wheel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="machine">
          <div className="marquee">
            <div className="marqueeText">
              SPLAT-A-PAT
            </div>
          </div>
          <div className="console">
            <div className="pointsBoard">
              <div className="points">
                20 POINTS
              </div>
            </div>
            <Wheel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
