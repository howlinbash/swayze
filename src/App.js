import React, { Component } from 'react';
import './App.css';
import pat from './faces/pat.png';
import will from './faces/will.png';
import hilary from './faces/hilary.png';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="machine">
          <div className="marquee">
            <div className="marqueeText">
              SPLAT-A-PAT
            </div>
          </div>
          <div className="console">
            <div className="pointsBoard">
              <div className="points">
                20 POINTS
              </div>
            </div>
            <div className="wheel">
              <div className="window a">
                <img src={hilary} />
              </div>
              <div className="window b">
                <img src={will} />
              </div>
              <div className="window c">
                <img src={pat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
