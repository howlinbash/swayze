import { makePackets, makeTypes } from "../redux-charts";

const eventsConfig = {
  spin: {},
  stop: {},
  peek: { props: ["id"] },
};

// export default eventsConfig;
export const Events = makeTypes(eventsConfig);

export const { spin, stop, peek } = makePackets(eventsConfig);
