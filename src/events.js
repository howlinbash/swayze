import { makePackets, makeTypes } from "./redux-charts";

export const generateType = (name) => name.toUpperCase();

const eventsConfig = {
  spin: {},
  stop: {},
  peek: { props: ["id"] },
};

export const Types = makeTypes(eventsConfig);

export const { spin, stop, peek } = makePackets(eventsConfig);
