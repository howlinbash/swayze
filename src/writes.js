import { makePackets, makeTypes } from "./lib";

export const generateType = name => name.toUpperCase();

const writesConfig = {
  levelUp: {},
  transition: { props: ["state"] }
};

export const Types = makeTypes(writesConfig);

export const { levelUp, transition } = makePackets(writesConfig, true);
