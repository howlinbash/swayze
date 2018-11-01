import React, { Component } from 'react';
import Wheel from './Wheel';
import PointsBoard from './PointsBoard';
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
            <PointsBoard />
            <Wheel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
