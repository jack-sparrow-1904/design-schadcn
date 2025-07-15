import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Layer, LayerType } from "../types";
import { DEFAULT_LAYER_TYPES } from "../layerTypes";

export type State = {
  layers: Layer[];
  layerTypes: LayerType[];
  selectedLayers: string[];
  history: State[];
  historyIndex: number;
};

export type Action =
  | {
      type: "ADD_LAYER";
      payload: Layer;
    }
  | {
      type: "SELECT_LAYER";
      payload: string;
    }
  | {
      type: "UPDATE_LAYER_CSS";
      payload: {
        id: string;
        css: Record<string, string>;
      };
    }
  | { type: "UNDO" }
  | { type: "REDO" };

const initialState: State = {
  layers: [
    {
      id: "1",
      type: "text",
      name: "Text 1",
      value: "Hello World",
      cssVars: {
        "--width": "200px",
        "--height": "100px",
        "--translate-x": "100px",
        "--translate-y": "100px",
      },
    },
  ],
  layerTypes: DEFAULT_LAYER_TYPES,
  selectedLayers: [],
  history: [],
  historyIndex: -1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LAYER": {
      const newState = {
        ...state,
        layers: [...state.layers, action.payload],
      };
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), state];
      return { ...newState, history: newHistory, historyIndex: newHistory.length -1};
    }
    case "SELECT_LAYER":
      return {
        ...state,
        selectedLayers: [action.payload],
      };
    case "UPDATE_LAYER_CSS": {
      const newState = {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.payload.id
            ? {
                ...layer,
                cssVars: {
                  ...layer.cssVars,
                  ...action.payload.css,
                },
              }
            : layer
        ),
      };
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), state];
      return { ...newState, history: newHistory, historyIndex: newHistory.length -1};
    }
    case "UNDO": {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return { ...state.history[newIndex], history: state.history, historyIndex: newIndex };
      }
      return state;
    }
    case "REDO": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return { ...state.history[newIndex], history: state.history, historyIndex: newIndex };
      }
      return state;
    }
    default:
      return state;
  }
};

export const DesignerContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const DesignerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DesignerContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignerContext.Provider>
  );
};
