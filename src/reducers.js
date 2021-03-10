import { combineReducers } from "redux";
import { Machine } from "./constants";

const chart = (state = "", write) => {
  if (write.type === Machine.setState) {
    return write.state;
  }
  if (write.type === Machine.transition) {
    return write.state;
  }
  return state;
};

const reducer = combineReducers({ chart });

export default reducer;
