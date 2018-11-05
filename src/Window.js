import React, { Component } from 'react';
import Face from './Face';
import { pat, question } from './faces';
import './Window.css';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = { guessMade: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isSpinning } = this.props;
    if (isSpinning !== prevProps.isSpinning) {
      this.setState(state => ({ guessMade: false }));
    }
  }

  handleClick(id) {
    const { answer, face, } = this.props;
    this.setState(state => ({ guessMade: true }));
    answer(face === pat)
  }

  render() {
  const { face, focus, id, isSpinning } = this.props;
  const { guessMade } = this.state;

  if (guessMade) {
    return (
      <div className="window" key={id}>
        <img src={face} />
      </div>
    )
  }

  return (
    <div
      className="window"
      key={id}
      onClick={() => this.handleClick(id)}
    >
      {isSpinning && !guessMade ? (
        focus === id ? <Face face={pat} id={id} /> : null
      ) : (
        <img src={question} />
      )}
    </div>
    )
  }
}

export default Window;
