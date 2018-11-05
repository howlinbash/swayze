import React, { Component } from 'react';
import Window from './Window';
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

  focus(wheel) {
    this.setState(state => ({
      focus: wheel
    }));
  }

  getNextKey(prevKey) {
    if (prevKey === 2) { return 0 };
    return prevKey + 1;
  }

  render() {
    const { answer, faces, } = this.props;
    const { focus, isSpinning, windows } = this.state;

    return (
      <div className="wheel">
        {windows.map(({id}) => (
          <Window
            answer={answer}
            face={faces[id]}
            focus={focus}
            id={id}
            isSpinning={isSpinning}
            key={id}
          />
        ))}
      </div>
    );
  }
};

export default Wheel;
