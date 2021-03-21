export const getAppState = (state) => state.chart;

export const getIsRevealed = (state, id) => state.ui[id];

export const getIsSpinning = (state) => getAppState(state) === "/playing/spinning";

export const getLevelNo = (state) => state.game.level;

export const getLevel = (state) => {
  const levelNo = getLevelNo(state);
  return state.config[levelNo];
};

export const getPat = (state) => {
  const level = getLevel(state);
  return level.indexOf(0);
};

export const getMessage = (state) => {
  const stateName = getAppState(state).split("/").pop();
  const message = state.message[stateName];
  if (typeof message === "string") return message;
  return message[0];
};

export const getAttempts = (state) => state.game.attempts;

export const getIsNotStarted = (state) => getAppState(state) === "/playing/spinning";
