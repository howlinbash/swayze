import { ReduxState, MessageReducer } from "./reducers";

export const getAppState = (state: ReduxState) => state.chart;

export const getIsRevealed = (state: ReduxState, id: number) => state.ui[id];

export const getIsSpinning = (state: ReduxState) =>
  getAppState(state) === "/playing/spinning";

export const getLevelNo = (state: ReduxState) => state.game.level;

export const getLevel = (state: ReduxState) => {
  const levelNo = getLevelNo(state);
  return state.config[levelNo];
};

export const getPat = (state: ReduxState) => {
  const level = getLevel(state);
  return level.indexOf(0);
};

export const getMessage = (state: ReduxState) => {
  const stateName = getAppState(state).split("/").pop();
  if (!stateName) {
    throw new Error("No appState in reducer!");
  }
  const message = state.message[stateName as keyof MessageReducer];
  if (typeof message === "string") return message;
  return message[0];
};

export const getAttempts = (state: ReduxState) => state.game.attempts;

export const getIsNotStarted = (state: ReduxState) =>
  getAppState(state) === "/notStarted";
