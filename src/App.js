import React, { Component } from 'react';
import { delay } from './utils';
import Marquee from './Marquee';
import PointsBoard from './PointsBoard';
import Wheel from './Wheel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isSpinning: false }
    this.spinWheel = this.spinWheel.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);
  }


  toggleSpinner() {
    this.setState(state => ({
      isSpinning: !state.isSpinning
    }));
  }

  spinWheel() {
    this.toggleSpinner();
    delay(3000).then(() => {this.toggleSpinner()})
  }

  render() {
    return (
      <div className="app">
        <div className="machine">
          <Marquee onClick={this.spinWheel} />
          <div className="console">
            <PointsBoard />
            <Wheel isSpinning={this.state.isSpinning} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
