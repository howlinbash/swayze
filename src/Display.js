import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'SPIN THE WHEEL' }
  }

  componentDidUpdate(prevProps) {
    const { answer, attempt, gameOver, isSpinning, round } = this.props;

    if (gameOver && gameOver !== prevProps.gameOver) {
      this.setState(state => ({ message: "GAME OVER" }));
      return;
    }

    if (isSpinning !== prevProps.isSpinning) {
      if (!isSpinning) {
        this.setState(state => ({ message: "WHERE'S PAT?" }));
        return;
      }
      this.setState(state => ({ message: `ROUND ${round}` }));
      return;
    }

    if (!answer && attempt !== prevProps.attempt) {
      if (attempt === 2) {
        this.setState(state => ({ message: "THAT'S NOT HIM EITHER" }));
        return;
      }
      if (attempt === 1) {
        this.setState(state => ({ message: "THAT'S NOT PAT" }));
        return;
      }
    }

    if (answer && attempt !== prevProps.attempt) {
      this.setState(state => ({ message: "BINGO!" }));
      return;
    }
  }

  render() {
    const { jeff } = this.props;

    return (
      <div className="display">
        <div className="message">
          {jeff ? 'TRIPLE JEFF - OHMIGOD!' : this.state.message}
        </div>
      </div>
    );
  };
};

export default Display;
