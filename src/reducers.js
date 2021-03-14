import { combineReducers } from "redux";
import { Machine } from "./constants";
import appConfig from "./config";
import { Types as Writes } from "./writes";

const chart = (state = "", write) => {
  switch (write.type) {
    case Machine.setState:
    case Machine.transition:
      return write.state;
    default:
      return state;
  }
};

const config = (state = appConfig.levels, write) => {
  switch (write.type) {
    default:
      return state;
  }
};

const initGame = { attempts: 0, level: 0 }

const game = (state = initGame, write) => {
  switch (write.type) {
    case Writes.levelUp:
      return {
        attempts: 0,
        level: state.level + 1
      };
    case Writes.reveal:
      return { ...state, attempts: state.attempts + 1 };
    case Writes.resetGame:
      return initGame;
    default:
      return state;
  }
};

const message = (state = appConfig.script, write) => {
  switch (write.type) {
    case Writes.levelUp:
      return {
        ...state,
        guessing: appConfig.script.guessing,
        spinning: state.spinning.slice(1)
      };
    case Writes.reveal:
      return {
        ...state,
        guessing: state.guessing.slice(1)
      };
    case Writes.resetGame:
      return appConfig.script;
    default:
      return state;
  }
};

const ui = (state = [0, 0, 0], write) => {
  switch (write.type) {
    case Writes.levelUp:
    case Writes.resetGame:
      return [0, 0, 0];
    case Writes.reveal: {
      const nextState = [...state];
      nextState[write.id] = 1;
      return nextState;
    };
    default:
      return state;
  }
};

const reducer = combineReducers({ chart, config, game, message, ui });

export default reducer;
