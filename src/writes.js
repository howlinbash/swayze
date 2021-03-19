import { makePackets, makeTypes } from "./lib";

export const generateType = (name) => name.toUpperCase();

const writesConfig = {
  levelUp: {},
  resetGame: {},
  reveal: { props: ["id"] },
  transition: { props: ["state"] },
};

export const Types = makeTypes(writesConfig);

export const { levelUp, resetGame, reveal, transition } = makePackets(
  writesConfig,
  true
);
