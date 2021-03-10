import { setDispatch } from "../lib";
import { setChart } from "../makeStates";
import { Machine } from "../constants";

let machine;

const getIdFromName = (byName, name) => {
  const locations = byName[name];
  if (!locations.length) return null;
  // Need to add case for no length and locator for > 1
  return locations[0][0];
};

const getIdFromPath = (byName, path) => {
  const start = path.lastIndexOf("/") + 1;
  const name = path.slice(start);
  return getIdFromName(byName, name);
};

const makeEvents = (byName, node) => {
  if (!node.events) return null;
  const events = {};
  Object.entries(node.events).forEach(([k, v]) => {
    events[k] = getIdFromName(byName, v);
  });
  return events;
};

export const makeStateNodes = chart => {
  const byId = {};
  const byName = {};
  let id = 0;

  const initNodes = (chart, parent) => {
    Object.entries(chart.states).forEach(([stateName, state]) => {
      const nodeId = String(id);

      // Parent knows child
      parent.children.push(nodeId);

      // Create stateNode
      const node = {
        children: [],
        events: state.on || null,
        id: nodeId,
        initial: state.initial || null,
        name: stateName,
        parent: parent.id,
        path: `${parent.path}${parent.parent ? "/" : ""}${stateName}`,
      };

      // Assign node to id table
      byId[node.id] = node;

      // Assign node address tuple to name table
      if (byName[node.name]) {
        byName[node.name] = byName[node.name].push([node.id, node.path]);
      } else {
        byName[node.name] = [[node.id, node.path]];
      };

      id += 1;

      // Recursively repeat for remaining nodes in state.
      if (state.states) {
        initNodes(state, node);
      }
    })
  }

  const rootId = String(id);
  const rootNode = {
    children: [],
    events: chart.on || null,
    id: rootId,
    initial: chart.initial,
    name: null,
    parent: null,
    path: "/",
    siblings: null,
  };
  byId[rootId] = rootNode;
  byName[rootNode.path] = [[rootId, rootNode.path]]
  id += 1;

  initNodes(chart, rootNode);

  const getSiblings = (byId, node) => {
    if (!node.parent) return null;
    const parent = byId[node.parent];
    if (parent.children.length <= 1) return null;

    // Siblings are parents children minus self
    return parent.children.filter(i => i !== node.id);
  };

  const finishNodes = id => {
    const node = byId[id];

    // Initial becomes id
    node.initial = node.initial && getIdFromName(byName, node.initial);
    node.events = makeEvents(byName, node);
    node["siblings"] = getSiblings(byId, node);
    if (node.children.length) {
      node.children.forEach(id => finishNodes(id));
    }
  }

  finishNodes(rootId);

  return { byId, byName };
};

const getNextState = (state, event) => {
  // Root doesn't even have events
  if (state.id === "0" && !state.events) return null;

  const localId = state.events && state.events[event.type];

  // State found
  if (localId) return machine.states.byId[localId];

  // Not even a root event
  if (state.id === "0") return null;

  // Not found yet, try the parent.
  const parent = machine.states.byId[state.parent];
  return getNextState(parent, event);
};

const initMachine = (config, store) => {
  const chart = config;

  const transition = nextState => {
    // If state has an initial state we should go to that instead
    let state;
    if (nextState.initial) {
      state = machine.states.byId[nextState.initial].path
    } else {
      state = nextState.path;
    }
    store.dispatch({ type: Machine.transition, state });
  };

  const states = makeStateNodes(chart);

  const receive = event => {
    const currentState = store.getState().chart;
    const id = getIdFromPath(machine.states.byName, currentState);
    const state = machine.states.byId[id];
    const nextState = getNextState(state, event);
    nextState && transition(nextState)
  };

  return {
    receive,
    states,
    transition
  };
};

export const connectMachine = store => next => event => {
  next(event);

  if (event.type === Machine.init) {
    setDispatch(store.dispatch);
    return;
  }
  if (event.type === Machine.start) {
    const chart = event.getChart();
    setChart(chart);
    machine = initMachine(chart, store);
    const nextStateId = machine.states.byId["0"].initial;
    const nextState = machine.states.byId[nextStateId];
    store.dispatch({ type: Machine.setState, state: nextState.path });
    return;
  }
  if (machine && event.type !== Machine.setState) machine.receive(event);
};
