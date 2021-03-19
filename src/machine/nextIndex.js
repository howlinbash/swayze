import { getAppState } from "../selectors";
import { transition } from "../writes"; // this is asking lib/makeTypes to already exist
import chart from "./charts";

export const connectMachine = ({ getState }) => (next) => (event) => {
  next(event);

  const state = getAppState(getState());
  if (state === "") return;

  const config = chart.states[state.slice(1)];
  const nextState = config.on[event.type];
  if (nextState) transition(`/${nextState}`);
};

export const initMachine = () => transition(`/${chart.initial}`);
