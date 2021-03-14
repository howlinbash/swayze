import { correctGuess, spin, wasLastRound, writeLevelUp } from "../actions";

const chart = {
  initial: "notStarted",
  states: {
    notStarted: {
      on: {
        "SPIN": "playing"
      }
    },
    playing: {
      initial: "spinning",
      states: {
        spinning: {
          entry: spin,
          on: {
            "STOP": "guessing"
          }
        },
        guessing: {
          on: {
            "PEEK": {
              target: "found",
              cond: correctGuess
            }
          }
        },
        found: {
          always: {
            target: "gameOver",
            cond: wasLastRound
          },
          entry: writeLevelUp,
          on: {
            "SPIN": "spinning"
          }
        }
      }
    },
    gameOver: {
      on: {
        "SPIN": "playing"
      }
    }
  }
};

const getChart = () => chart;

export default getChart;
