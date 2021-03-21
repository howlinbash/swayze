import { setDispatch } from "./packets";
import { Machine } from "./constants";
import { Writes } from "../machine";

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

const makeAlways = (byName, always) => ({
  ...always,
  target: getIdFromName(byName, always.target),
});

const makeTranistions = (byName, node) => {
  if (!node.transitions) return null;
  const transitions = {};
  Object.entries(node.transitions).forEach(([k, v]) => {
    transitions[k] =
      typeof v === "string"
        ? getIdFromName(byName, v)
        : { ...v, target: getIdFromName(byName, v.target) };
  });
  return transitions;
};

export const makeStateNodes = (chart) => {
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
        always: state.always || null,
        children: [],
        entry: state.entry || null,
        exit: state.exit || null,
        id: nodeId,
        initial: state.initial || null,
        name: stateName,
        parent: parent.id,
        path: `${parent.path}${parent.parent ? "/" : ""}${stateName}`,
        transitions: state.on || null,
      };

      // Assign node to id table
      byId[node.id] = node;

      // Assign node address tuple to name table
      if (byName[node.name]) {
        byName[node.name] = byName[node.name].push([node.id, node.path]);
      } else {
        byName[node.name] = [[node.id, node.path]];
      }

      id += 1;

      // Recursively repeat for remaining nodes in state.
      if (state.states) {
        initNodes(state, node);
      }
    });
  };

  const rootId = String(id);
  const rootNode = {
    children: [],
    id: rootId,
    initial: chart.initial,
    name: null,
    parent: null,
    path: "/",
    siblings: null,
    transitions: chart.on || null,
  };
  byId[rootId] = rootNode;
  byName[rootNode.path] = [[rootId, rootNode.path]];
  id += 1;

  initNodes(chart, rootNode);

  const getSiblings = (byId, node) => {
    if (!node.parent) return null;
    const parent = byId[node.parent];
    if (parent.children.length <= 1) return null;

    // Siblings are parents children minus self
    return parent.children.filter((i) => i !== node.id);
  };

  const finishNodes = (id) => {
    const node = byId[id];

    // Initial becomes id
    node.always = node.always && makeAlways(byName, node.always);
    node.initial = node.initial && getIdFromName(byName, node.initial);
    node.transitions = makeTranistions(byName, node);
    node["siblings"] = getSiblings(byId, node);
    if (node.children.length) {
      node.children.forEach((id) => finishNodes(id));
    }
  };

  finishNodes(rootId);

  return { byId, byName };
};

const getIdOrTransition = (state, event) => {
  // Root doesn't even have transitions
  if (state.id === "0" && !state.transitions) return null;

  const transition = state.transitions && state.transitions[event.type];

  // Transition found
  if (transition) return transition;

  // Root has no transition for this event
  if (state.id === "0") return null;

  // Not found yet, try the parent.
  const parent = machine.states.byId[state.parent];
  return getIdOrTransition(parent, event);
};

const stateCanTransition = (transition, event, storeState) => {
  if (!transition.target) throw new Error("Transition has no target");
  if (transition.cond) {
    const { type, ...data } = event;
    if (!transition.cond(data, storeState)) return null;
  }
  return machine.states.byId[transition.target];
};

const getNextState = (state, event, storeState) => {
  const idOrTransition = getIdOrTransition(state, event);
  if (!idOrTransition) return null;

  if (typeof idOrTransition === "string") {
    return machine.states.byId[idOrTransition];
  }

  if (idOrTransition.actions) {
    const { type, ...eventPayload } = event;
    fireAction(idOrTransition.actions, eventPayload, storeState);
  }

  return stateCanTransition(idOrTransition, event, storeState);
};

const fireAction = (actions, eventPayload, storeState) => {
  actions(eventPayload, storeState);
};

const initMachine = (config, store) => {
  const chart = config;

  const execTransition = (newState, event, storeState) => {
    // Handle transient transition
    if (newState.always) {
      const nextState = stateCanTransition(newState.always, event, storeState);
      if (nextState) {
        execTransition(nextState, event);
        return;
      }
    }

    const { type, ...data } = event;
    // Handle entry action
    newState.entry && newState.entry(data, store.getState());

    // Handle initial state
    if (newState.initial) {
      execTransition(machine.states.byId[newState.initial], event, storeState);
      return;
    }

    // Update store
    store.dispatch({ type: Machine.transition, state: newState.path });
  };

  const states = makeStateNodes(chart);

  const receive = (event) => {
    const storeState = store.getState();
    const currentState = storeState.chart;
    const id = getIdFromPath(machine.states.byName, currentState);
    const state = machine.states.byId[id];
    const nextState = getNextState(state, event, storeState);
    const { type, ...eventPayload } = event;
    nextState && state.exit && fireAction(state.exit, eventPayload, storeState);
    nextState && execTransition(nextState, event, storeState);
  };

  return {
    receive,
    states,
  };
};

export const connectMachine = (store) => (next) => (event) => {
  next(event);

  if (event.type === Machine.init) {
    setDispatch(store.dispatch);
    return;
  }
  if (event.type === Machine.start) {
    machine = initMachine(event.chart, store);
    const nextStateId = machine.states.byId["0"].initial;
    const nextState = machine.states.byId[nextStateId];
    store.dispatch({ type: Machine.setState, state: nextState.path });
    return;
  }
  const ignores = [...Object.values(Writes), ...Object.values(Machine)];
  if (machine && !ignores.includes(event.type)) machine.receive(event);
};
