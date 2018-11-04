import React, { Component } from 'react';
import { delay } from './utils';
import Marquee from './Marquee';
import Display from './Display';
import Wheel from './Wheel';
import rules from './rules';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      gameOver: true,
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
    const { gameOver, round } = this.state;
    if (gameOver) {
      this.setState(state => ({
        gameOver: false,
        round: 0,
      }));
      return;
    }
    if (round === rules.length) {
      this.setState(state => ({
        gameOver: true,
        round: 0,
      }));
      return;
    }
    this.setState(state => {
      const nextRound = state.round + 1;
      return ({round: nextRound});
    });
  }

  handleAnswer(answer) {
    this.setState(state => ({ answer: answer }));
  }

  handleClick() {
    this.updateGameState();
    this.spinWheel();
  }


  render() {
    const { answer, round } = this.state;

    return (
      <div className="app">
        <div className="machine">
          <Marquee onClick={() => this.handleClick()} />
          <div className="console">
            <Display
              answer={answer}
              round={rules[round].round}
            />
            <Wheel
              answer={answer => this.handleAnswer(answer)}
              requestStartSpin={this.state.isSpinning}
              faces={rules[round]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
