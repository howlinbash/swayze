export const getAppState = state => state.chart;

export const getIsRevealed = (state, id) => state.ui[id];

export const getLevelNo = state => state.level;

export const getLevel = state => {
  const levelNo = getLevelNo(state);
  return state.config[levelNo];
}
