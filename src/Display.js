import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'SPIN THE WHEEL' }
  }

  render() {
    return (
      <div className="display">
        <div className="message">
          {this.state.message}
        </div>
      </div>
    );
  };
};

export default Display;
