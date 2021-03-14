import { spin } from "../actions";

const correctGuess = ({ id }) => id === "charlie";

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
