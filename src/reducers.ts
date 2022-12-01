import { combineReducers } from "./redux-charts";
import appConfig from "./config";
import { Writes } from "./machine";
import { Packet } from "./redux-charts/types";

type ConfigState = typeof appConfig.levels;

type ConfigReducer = typeof config;

const config = (state = appConfig.levels, write: Packet) => {
  switch (write.type) {
    default:
      return state;
  }
};

const initGame = { attempts: 0, level: 0 };

type GameState = typeof initGame;

type GameReducer = typeof game;

const game = (state = initGame, write: Packet) => {
  switch (write.type) {
    case Writes.levelUp:
      return {
        attempts: 0,
        level: state.level + 1,
      };
    case Writes.reveal:
      return { ...state, attempts: state.attempts + 1 };
    case Writes.resetGame:
      return initGame;
    default:
      return state;
  }
};

export type MessageState = typeof appConfig.script;

export type MessageReducer = typeof message;

const message = (state = appConfig.script, write: Packet) => {
  switch (write.type) {
    case Writes.levelUp:
      return {
        ...state,
        guessing: appConfig.script.guessing,
        spinning: state.spinning.slice(1),
      };
    case Writes.reveal:
      return {
        ...state,
        guessing: state.guessing.slice(1),
      };
    case Writes.resetGame:
      return appConfig.script;
    default:
      return state;
  }
};

const initUi = [0, 0, 0];

type UiState = typeof initUi;

type UiReducer = typeof ui;

const ui = (state = initUi, write: Packet) => {
  switch (write.type) {
    case Writes.levelUp:
    case Writes.resetGame:
      return [0, 0, 0];
    case Writes.reveal: {
      const nextState = [...state];
      nextState[write.id as number] = 1;
      return nextState;
    }
    default:
      return state;
  }
};

export interface ReduxState {
  config: ConfigState;
  game: GameState;
  message: MessageState;
  ui: UiState;
  chart: string; // TODO extract to redux-charts library
}

export interface Reducers {
  config: ConfigReducer;
  game: GameReducer;
  message: MessageReducer;
  ui: UiReducer;
}

const reducer = combineReducers({ config, game, message, ui });

export type RootReducer = typeof reducer;

export default reducer;
