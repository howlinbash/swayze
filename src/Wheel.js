import React, { Component } from 'react';
import { delay } from './utils';
import Face from './Face';
import { question } from './faces';
import './Wheel.css';

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      focus: '',
      isSpinning: false,
      windows: [
        {id: 'alpha'},
        {id: 'beta'},
        {id: 'charlie'}
      ],
    }
  }

  componentDidUpdate(prevProps) {
    const { requestStartSpin } = this.props;
    const { isSpinning } = this.state;
    if (requestStartSpin && !isSpinning) {
	  this.setState(state => ({ isSpinning: true }));
	  this.alternateWindows()
	}
	if (isSpinning && requestStartSpin !== prevProps.requestStartSpin ) {
	  this.setState(state => ({ isSpinning: false }));
      clearInterval(this.timerID);
    }
  }

  focus(wheel) {
    this.setState(state => ({
      focus: wheel
    }));
  }

  getNextKey(prevKey) {
    if (prevKey === 2) { return 0 };
    return prevKey + 1;
  }

  alternateWindows() {
    const { windows } = this.state;
    let key = 0;
    this.timerID = setInterval(() => {
        this.focus(windows[key].id)
        key = this.getNextKey(key)
      },
      150
    );
  }

  render() {
    const { focus, isSpinning, windows } = this.state;

    return (
      <div className="wheel">
        {windows.map(({id}) => {
		  return (
			<div className="window" key={id} >
			  {isSpinning ? (
				focus === id ? <Face id={id} /> : null
			  ) : (
				<img src={question} />
			  )}
			</div>
		  )}
		)}
      </div>
    );
  }
};

export default Wheel;
