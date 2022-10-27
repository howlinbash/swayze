import { makePackets, makeTypes } from "../redux-charts";

const writesConfig = {
  levelUp: {},
  resetGame: {},
  reveal: { props: ["id"] },
  transition: { props: ["state"] },
};

export const Writes = makeTypes(writesConfig);

export const { levelUp, resetGame, reveal, transition } = makePackets(
  writesConfig,
  true
);
