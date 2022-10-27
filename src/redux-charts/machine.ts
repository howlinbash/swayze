import { setDispatch } from "./packets";
import { Machine } from "./constants";
import { Writes } from "../machine";
import {
  Action,
  ById,
  ByName,
  Chart,
  Packet,
  Payload,
  State,
  StateMachine,
  StateNode,
  Transition,
  Transitions,
} from "./types";
import { Dispatch, MiddlewareAPI } from "redux";
import { ReduxState } from "../reducers";

const getIdFromName = (byName: ByName, name: string) => {
  const locations = byName[name];
  if (!locations.length) {
    throw new Error("state incorrectly indexed");
  }
  // Need to add case for no length and locator for > 1
  return locations[0][0];
};

const getIdFromPath = (byName: ByName, path: string) => {
  const start = path.lastIndexOf("/") + 1;
  const name = path.slice(start);
  return getIdFromName(byName, name);
};

const makeAlways = (byName: ByName, always: Transition) => ({
  ...always,
  target: getIdFromName(byName, always.target),
});

const makeTranistions = (byName: ByName, node: StateNode) => {
  if (!node.transitions) return null;
  const transitions: Transitions = {};
  Object.entries(node.transitions).forEach(([k, v]) => {
    transitions[k] =
      typeof v === "string"
        ? getIdFromName(byName, v)
        : { ...v, target: getIdFromName(byName, v.target) };
  });
  return transitions;
};

const makeStateNodes = (chart: Chart) => {
  const byId: ById = {};
  const byName: ByName = {};
  let id = 0;

  const initNodes = (chart: Chart | State, parent: StateNode) => {
    if (!chart.states) return;
    Object.entries(chart.states).forEach(([stateName, state]) => {
      const nodeId = String(id);

      // Parent knows child
      parent.children.push(nodeId);

      // Create stateNode
      const node: StateNode = {
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
        siblings: null,
      };

      // Assign node to id table
      byId[node.id] = node;

      // Assign node address tuple to name table
      if (node.name) {
        if (byName[node.name]) {
          byName[node.name].push([node.id, node.path]);
        } else {
          byName[node.name] = [[node.id, node.path]];
        }
      }

      id += 1;

      // Recursively repeat for remaining nodes in state.
      if (state.states) {
        initNodes(state, node);
      }
    });
  };

  const rootId = String(id);
  const rootNode: StateNode = {
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

  const getSiblings = (byId: ById, node: StateNode) => {
    if (!node.parent) return null;
    const nodeParent = byId[node.parent];
    if (nodeParent.children.length <= 1) return null;

    // Siblings are parents children minus self
    return nodeParent.children.filter((i) => i !== node.id);
  };

  const finishNodes = (id: string) => {
    const node = byId[id];

    // Initial becomes id
    node.always = node.always && makeAlways(byName, node.always);
    node.initial = node.initial && getIdFromName(byName, node.initial);
    node.transitions = makeTranistions(byName, node);
    if (node.parent) {
      node.siblings = getSiblings(byId, node);
    }
    if (node.children.length) {
      node.children.forEach((id) => finishNodes(id));
    }
  };

  finishNodes(rootId);

  return { byId, byName };
};

const getIdOrTransition = (
  state: StateNode,
  event: Packet,
  machine: StateMachine
): Transition | string | null => {
  // Root doesn't even have transitions
  if (state.id === "0" && !state.transitions) return null;

  const transition = state.transitions && state.transitions[event.type];

  // Transition found
  if (transition) return transition;

  // Root has no transition for this event
  if (state.id === "0") return null;

  // Not found yet, try the parent.
  if (!state.parent) {
    throw new Error(
      "Can't find relevant transition on node and parent doesn't exist"
    );
  }
  const parent = machine.states.byId[state.parent];
  return getIdOrTransition(parent, event, machine);
};

const stateCanTransition = (
  transition: Transition,
  event: Packet,
  storeState: ReduxState,
  machine: StateMachine
) => {
  if (!transition.target) throw new Error("Transition has no target");
  if (transition.cond) {
    const { type, ...data } = event;
    if (!transition.cond(data, storeState)) return null;
  }
  return machine.states.byId[transition.target];
};

const getNextState = (
  state: StateNode,
  event: Packet,
  storeState: ReduxState,
  machine: StateMachine
) => {
  const idOrTransition = getIdOrTransition(state, event, machine);
  if (!idOrTransition) return null;

  if (typeof idOrTransition === "string") {
    return machine.states.byId[idOrTransition];
  }

  if (idOrTransition.actions) {
    const { type, ...eventPayload } = event;
    fireAction(idOrTransition.actions, eventPayload, storeState);
  }

  return stateCanTransition(idOrTransition, event, storeState, machine);
};

const fireAction = (
  actions: Action,
  eventPayload: Payload,
  storeState: ReduxState
) => {
  actions(eventPayload, storeState);
};

const execTransition = (
  newState: StateNode,
  event: Packet,
  storeState: ReduxState,
  store: MiddlewareAPI,
  machine: StateMachine
) => {
  // Handle transient transition
  if (newState.always) {
    const nextState = stateCanTransition(
      newState.always,
      event,
      storeState,
      machine
    );
    if (nextState) {
      execTransition(nextState, event, storeState, store, machine);
      return;
    }
  }

  const { type, ...data } = event;
  // Handle entry action
  newState.entry && newState.entry(data, store.getState());

  // Handle initial state
  if (newState.initial) {
    execTransition(
      machine.states.byId[newState.initial],
      event,
      storeState,
      store,
      machine
    );
    return;
  }

  // Update store
  store.dispatch({ type: Machine.transition, state: newState.path });
};

const initMachine = (chart: Chart, store: MiddlewareAPI) => {
  const machine: StateMachine = {
    states: makeStateNodes(chart),
  };

  const receive = (event: Packet, machine: StateMachine) => {
    const storeState = store.getState();
    const currentState = storeState.chart;
    const id = getIdFromPath(machine.states.byName, currentState);
    const state = machine.states.byId[id];
    const nextState = getNextState(state, event, storeState, machine);
    const { type, ...eventPayload } = event;
    nextState && state.exit && fireAction(state.exit, eventPayload, storeState);
    nextState && execTransition(nextState, event, storeState, store, machine);
  };

  machine.receive = receive;

  return machine;
};

let machine: StateMachine;

export const connectMachine =
  (store: MiddlewareAPI) => (next: Dispatch) => (event: Packet) => {
    next(event);

    if (event.type === Machine.init) {
      setDispatch(store.dispatch);
      return;
    }

    if (event.type === Machine.start) {
      machine = initMachine(event.chart as Chart, store);
      const nextStateId = machine.states.byId["0"].initial as string;
      const nextState = machine.states.byId[nextStateId];
      store.dispatch({
        type: Machine.setState,
        state: nextState.path,
      });
      return;
    }

    const ignores = [...Object.values(Writes), ...Object.values(Machine)];
    if (machine && machine.receive && !ignores.includes(event.type))
      machine.receive(event, machine);
  };
