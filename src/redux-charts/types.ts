import { ReduxState } from "../reducers";

type dispatcher = (args?: unknown) => void;
type activeDispatcher = (args?: unknown) => () => void;
type PacketDispatcher = dispatcher | activeDispatcher;

export type Payload = {
  [key: string]: unknown;
};

export type Packet = {
  type: string;
} & Payload;

export interface PacketsConfig {
  [key: string]: { props: string[] } | {};
}

export interface Packets {
  [key: string]: PacketDispatcher;
}

export type PacketTypes = Record<string, string>;

type Guard = (eventPayload: Payload, storeState: ReduxState) => boolean;

export type Action = (eventPayload: Payload, storeState: ReduxState) => void;

type Target = string;

export interface Transition {
  target: Target;
  actions?: Action;
  cond?: Guard;
}

export interface State {
  initial?: string;
  states?: Record<string, State>;
  on?: Record<string, Transition | Target>;
  exit?: Action;
  entry?: Action;
  always?: Transition;
}

export interface Chart {
  initial: string;
  states: Record<string, State>;
  on?: Record<string, Transition | Target>;
}

export interface StateMachine {
  states: {
    byId: ById;
    byName: ByName;
  };
  receive?: (event: Packet, machine: StateMachine) => void;
}

export type Transitions = Record<string, Transition | Target>;

export interface StateNode {
  always?: Transition | null;
  entry?: Action | null;
  exit?: Action | null;
  children: string[];
  id: string;
  initial: string | null;
  name: string | null;
  parent: string | null;
  path: string;
  siblings: string[] | null;
  transitions: Transitions | null;
}

export type ById = Record<string, StateNode>;
export type ByName = Record<string, [string, string][]>;
