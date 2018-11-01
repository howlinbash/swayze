import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import paddy from './pat.gif';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="machine">
          <div className="marquee">
          </div>
          <div className="console">
            <div className="pointsBoard">
            </div>
            <div className="wheel">
              <div className="window">
              </div>
              <div className="window">
              </div>
              <div className="window">
                <img src={paddy} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
