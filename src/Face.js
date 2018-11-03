import React, { Component } from 'react';
import { delay } from './utils';
import { pat } from './faces';

class Face extends Component {
  constructor(props) {
    super(props);
    this.state = { display: '' }
  }

  componentDidMount() {
    delay(1000).then(() => {this.blink()})
  }

  blink() {
    this.setState(state => ({
      display: 'none'
    }));
  }

  render() {
    const { display } = this.state;

    return <img src={pat} style={{ display }} />
  }
};

export default Face;
