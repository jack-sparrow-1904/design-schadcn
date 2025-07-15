import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
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
  | { type: "REDO" }
  | { type: "SET_LAYERS"; payload: Layer[] };

const initialState: State = {
  layers: [],
  layerTypes: DEFAULT_LAYER_TYPES,
  selectedLayers: [],
  history: [],
  historyIndex: -1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LAYERS":
      return { ...state, layers: action.payload };
    case "ADD_LAYER": {
      const newState = {
        ...state,
        layers: [...state.layers, action.payload],
      };
      const newHistory = [
        ...state.history.slice(0, state.historyIndex + 1),
        state,
      ];
      return { ...newState, history: newHistory, historyIndex: newHistory.length - 1 };
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
      const newHistory = [
        ...state.history.slice(0, state.historyIndex + 1),
        state,
      ];
      return { ...newState, history: newHistory, historyIndex: newHistory.length - 1 };
    }
    case "UNDO": {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state.history[newIndex],
          history: state.history,
          historyIndex: newIndex,
        };
      }
      return state;
    }
    case "REDO": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state.history[newIndex],
          history: state.history,
          historyIndex: newIndex,
        };
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

type DesignerProviderProps = {
  children: ReactNode;
  defaultLayers?: Layer[];
  layers?: Layer[];
  onLayersChange?: (layers: Layer[]) => void;
};

export const DesignerProvider = ({
  children,
  defaultLayers,
  layers,
  onLayersChange,
}: DesignerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    layers: defaultLayers || layers || [],
  });

  useEffect(() => {
    if (layers) {
      dispatch({ type: "SET_LAYERS", payload: layers });
    }
  }, [layers]);

  useEffect(() => {
    if (onLayersChange) {
      onLayersChange(state.layers);
    }
  }, [state.layers, onLayersChange]);

  return (
    <DesignerContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignerContext.Provider>
  );
};
