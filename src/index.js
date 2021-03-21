import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { initMachine, getStore } from "./machine";
import reducer from "./reducers";
import { getChart } from "./machine";
import App from "./App";

initMachine(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={getStore(getChart)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
