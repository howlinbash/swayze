import React, { Component } from 'react';

class Face extends Component {
  constructor(props) {
    super(props);
    this.state = { display: '' }
  }

  componentDidMount() {
    const { display } = this.state;
    this.off = setTimeout(() => {
      this.blink(display);
      this.off = 0;
    }, 150);
  }

  componentWillUnmount() {
    if (this.off) {
        clearTimeout(this.off);
        this.off = 0;
    }
  }

  blink(state) {
    const display = state === '' ? 'none' : '';
    this.setState(state => ({
      display,
    }));
  }

  render() {
    const { display } = this.state;

    return <img src={this.props.face} style={{ display }} />
  }
};

export default Face;
