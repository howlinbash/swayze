import React, { Component } from 'react';
import Face from './Face';
import { pat, question } from './faces';
import './Window.css';

class Window extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    console.log('clicky', id);
  }

  render() {
  const { focus, id, isSpinning } = this.props;

  return (
    <div
      className="window"
      key={id}
      onClick={() => this.handleClick(id)}
    >
      {isSpinning ? (
        focus === id ? <Face face={pat} id={id} /> : null
      ) : (
        <img src={question} />
      )}
    </div>
    )
  }
}

export default Window;
