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
      attempt: 0,
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

    if (round === rules.length - 1) {
      this.setState(state => ({
        gameOver: true,
        round: 0,
      }));
      return;
    }

    this.setState(state => {
      const nextRound = state.round + 1;
      return ({
        attempt: 0,
        round: nextRound
      });
    });
  }

  handleAnswer(answer) {
    this.setState(state => {
      const nextAttempt = state.attempt + 1;
      return ({
        attempt: nextAttempt,
        answer: answer
      })
    });
  }

  handleClick() {
    const { round } = this.state;
    this.updateGameState();
    if (round !== rules.length - 1) {
      this.spinWheel();
    }
  }


  render() {
    const { answer, attempt, gameOver, round } = this.state;

    return (
      <div className="app">
        <div className="machine">
          <Marquee onClick={this.handleClick} />
          <div className="console">
            <Display
              answer={answer}
              attempt={attempt}
              gameOver={gameOver}
              isSpinning={this.state.isSpinning}
              jeff={round === 3 && attempt === 3}
              round={round < 4 && rules[round].round}
            />
            <Wheel
              answer={answer => this.handleAnswer(answer)}
              requestStartSpin={this.state.isSpinning}
              faces={round < 4 && rules[round]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
