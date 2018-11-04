import React, { Component } from 'react';
import { delay } from './utils';
import Marquee from './Marquee';
import PointsBoard from './PointsBoard';
import Wheel from './Wheel';
import rules from './rules';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      isSpinning: false,
      round: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }


  toggleSpinner() {
    this.setState(state => ({
      isSpinning: !state.isSpinning
    }));
  }

  spinWheel() {
    this.toggleSpinner();
    delay(1950).then(() => {this.toggleSpinner()})
  }

  updateGameState() {
    const { round } = this.state;
    if (round === 0) {
      this.setState(state => ({gameStarted: true}));
      return;
    }
    if (round === 5) {
      this.setState(state => ({gameStarted: false}));
      return;
    }
    this.setState(state => ({round: state.round + 1}));
  }

  handleClick() {
    this.updateGameState();
    this.spinWheel();
  }


  render() {
    const { round } = this.state;

    return (
      <div className="app">
        <div className="machine">
          <Marquee onClick={() => this.handleClick()} />
          <div className="console">
            <PointsBoard round={round} />
            <Wheel requestStartSpin={this.state.isSpinning} round={round} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
