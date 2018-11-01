import React, { Component } from 'react';
import Marquee from './Marquee';
import PointsBoard from './PointsBoard';
import Wheel from './Wheel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="machine">
          <Marquee />
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
