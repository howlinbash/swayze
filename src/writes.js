import { makePackets, makeTypes } from "./lib";

export const generateType = name => name.toUpperCase();

const writesConfig = {
  transition: { props: ["state"] }
};

export const Types = makeTypes(writesConfig);

export const { transition } = makePackets(writesConfig, true);
