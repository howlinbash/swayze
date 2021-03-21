import { configureStore } from "@reduxjs/toolkit";
import { connectMachine } from "./machine";
import { Machine } from "../constants";

let store;

export const initMachine = (reducer) => {
  store = configureStore({
    middleware: [connectMachine],
    reducer,
  });
  store.dispatch({ type: Machine.init });
};

export const getStore = (getChart) => {
  store.dispatch({ type: Machine.start, getChart });
  return store;
};
