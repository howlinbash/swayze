import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { chart, initMachine, getStore } from "./machine";
import reducer from "./reducers";
import App from "./App";

initMachine(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={getStore(chart)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
