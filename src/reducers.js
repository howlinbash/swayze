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

const reducer = combineReducers({ chart, level });

export default reducer;

export const getLevel = state => state.level;
