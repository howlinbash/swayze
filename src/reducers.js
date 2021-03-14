import { combineReducers } from "redux";
import { Machine } from "./constants";
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

const level = (state = 1, write) => {
  switch (write.type) {
    case Writes.levelUp:
      return state + 1;
    default:
      return state;
  }
};

const ui = (state = [0, 0, 0], write) => {
  switch (write.type) {
    case Writes.reveal: {
      const nextState = [...state];
      nextState[write.id] = 1;
      return nextState;
    };
    default:
      return state;
  }
};

const reducer = combineReducers({ chart, level, ui });

export default reducer;
