import { stop } from "./events";
import { getAttempts, getLevelNo, getPat } from "./selectors";
import { levelUp, resetGame, reveal } from "./writes";

export const correctGuess = ({ id }, state) =>
  id === getPat(state) || (getLevelNo(state) === 3 && getAttempts(state) === 2);

export const peek = ({ id }) => {
  reveal(id);
};

export const spin = () => setTimeout(stop(), 1800);

export const wasLastRound = (_, state) => {
  const level = getLevelNo(state);
  return level === 3;
};

export const writeLevelUp = () => {
  levelUp();
};

export const reset = () => {
  resetGame();
};