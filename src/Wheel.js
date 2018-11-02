import React, { Component } from 'react';
import { pat, question } from './faces';
import './Wheel.css';

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.windows = [...Array(3)]
  }

  render() {
    const { isSpinning } = this.props;

    return (
      <div className="wheel">
        {this.windows.map(window => (
          <div className="window">
            <img src={isSpinning ? pat : question} />
          </div>
        ))}
      </div>
    );
  }
};

export default Wheel;
