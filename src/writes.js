import { makePackets, makeTypes } from "./lib";

export const generateType = name => name.toUpperCase();

const writesConfig = {
  levelUp: {},
  reveal: { props: ["id"] },
  transition: { props: ["state"] }
};

export const Types = makeTypes(writesConfig);

export const { levelUp, reveal, transition } = makePackets(writesConfig, true);
