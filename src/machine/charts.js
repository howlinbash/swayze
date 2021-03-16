import {
  correctGuess,
  peek,
  reset,
  spin,
  wasLastRound,
  writeLevelUp,
} from "../actions";

const chart = {
  initial: "notStarted",
  states: {
    notStarted: {
      on: {
        SPIN: "playing",
      },
    },
    playing: {
      initial: "spinning",
      states: {
        spinning: {
          entry: spin,
          on: {
            STOP: "guessing",
          },
        },
        guessing: {
          on: {
            PEEK: {
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
            SPIN: "spinning",
          },
        },
      },
    },
    jeff: {
      on: {
        SPIN: "gameOver",
      },
    },
    gameOver: {
      on: {
        SPIN: {
          target: "notStarted",
          actions: reset,
        },
      },
    },
  },
};

const getChart = () => chart;

export default getChart;
