import { stop } from "./events";
import { getLevel } from "./selectors";
import { levelUp, reveal } from "./writes";

export const correctGuess = ({ id }) => id === "charlie";

export const peek = ({ id }) => {
  reveal(id);
};

export const spin = () => setTimeout(stop(), 1950);

export const wasLastRound = (_, state) => {
  const level = getLevel(state);
  return level === 3;
};

export const writeLevelUp = () => {
  levelUp();
};
