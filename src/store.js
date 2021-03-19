import { initStore, startMachine } from "./machine";
import reducer from "./reducers";
import { getChart } from "./machine";

initStore(reducer);

const store = startMachine(getChart);

export default store;
