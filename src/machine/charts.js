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
          on: {
            "STOP": "guessing"
          }
        },
        guessing: {
          on: {
            "PEEK": "found"
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
