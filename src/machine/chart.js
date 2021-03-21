import { Types as Events } from "../events";
import {
  correctGuess,
  peek,
  reset,
  spin,
  wasLastRound,
  writeLevelUp,
} from "./actions";

const chart = {
  initial: "notStarted",
  states: {
    notStarted: {
      on: {
        [Events.spin]: "playing",
      },
    },
    playing: {
      initial: "spinning",
      states: {
        spinning: {
          entry: spin,
          on: {
            [Events.stop]: "guessing",
          },
        },
        guessing: {
          on: {
            [Events.peek]: {
              target: "found",
              actions: peek,
              cond: correctGuess,
            },
          },
        },
        found: {
          always: {
            target: "jeff",
            cond: wasLastRound,
          },
          exit: writeLevelUp,
          on: {
            [Events.spin]: "spinning",
          },
        },
      },
    },
    jeff: {
      on: {
        [Events.spin]: "gameOver",
      },
    },
    gameOver: {
      on: {
        [Events.spin]: {
          target: "notStarted",
          actions: reset,
        },
      },
    },
  },
};

export default chart;
