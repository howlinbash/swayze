import { levelUp, resetGame, reveal, stop } from "./index";
import { getAttempts, getLevelNo, getPat } from "../selectors";
import { Payload } from "../redux-charts/types";
import { ReduxState } from "../reducers";

export const correctGuess = (action: Payload, state: ReduxState) =>
  action.id === getPat(state) ||
  (getLevelNo(state) === 3 && getAttempts(state) === 2);

export const peek = (action: Payload) => {
  reveal(action.id);
};

export const spin = () => setTimeout(stop() as () => void, 1800);

export const wasLastRound = (_: Payload, state: ReduxState) => {
  const level = getLevelNo(state);
  return level === 3;
};

export const writeLevelUp = () => {
  levelUp();
};

export const reset = () => {
  resetGame();
};
