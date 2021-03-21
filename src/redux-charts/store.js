import { configureStore } from "@reduxjs/toolkit";
import { combineReducers as reduxCombine } from "redux";
import { connectMachine } from "./machine";
import { Machine } from "./constants";

const chart = (state = "", write) => {
  switch (write.type) {
    case Machine.setState:
    case Machine.transition:
      return write.state;
    default:
      return state;
  }
};

export const combineReducers = (reducers) => reduxCombine({ chart, ...reducers });

let store;

export const initMachine = (reducer) => {
  store = configureStore({
    middleware: [connectMachine],
    reducer,
  });
  store.dispatch({ type: Machine.init });
};

export const getStore = (chart) => {
  store.dispatch({ type: Machine.start, chart });
  return store;
};
