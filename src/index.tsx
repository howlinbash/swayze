import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { initMachine, getStore } from "./redux-charts";
import { chart } from "./machine";
import reducer from "./reducers";
import App from "./App";
import { RootReducer } from "./reducers";

initMachine<RootReducer>(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={getStore(chart)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
