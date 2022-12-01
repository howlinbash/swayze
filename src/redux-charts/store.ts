import { configureStore } from "@reduxjs/toolkit";
import {
  combineReducers as reduxCombine,
  MiddlewareAPI,
  Store,
  Reducer,
} from "redux";
import { connectMachine } from "./machine";
import { Machine } from "./constants";
import { Chart, Packet } from "./types";
import { ReduxState } from "../reducers";

// TODO: Infer this type so user can add their reducers to it
const chart = (state = "", write: Packet) => {
  switch (write.type) {
    case Machine.setState:
    case Machine.transition: {
      const chartState = write.state;
      if (typeof chartState !== "string") {
        throw new Error("Transition payload must be string");
      }
      return chartState;
    }
    default:
      return state;
  }
};

export const combineReducers = <T>(reducers: T) =>
  reduxCombine({ ...reducers, chart });

let store: MiddlewareAPI;

export const initMachine = <T extends Reducer<ReduxState, Packet>>(
  reducer: T
) => {
  store = configureStore({
    middleware: [connectMachine],
    reducer,
  });
  store.dispatch({ type: Machine.init });
};

export const getStore = (chart: Chart): Store => {
  store.dispatch({ type: Machine.start, chart });
  return store as Store;
};
