let chart;

export const setChart = c => {
  chart = c;
};

export const makeStates = () => {
  const States = {};
  Object.keys(chart.states).forEach(key => {
    States[key] = `/${key}`;
  });
  return States;
};
