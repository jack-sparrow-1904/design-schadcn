import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Layer, LayerType } from "../types";
import { DEFAULT_LAYER_TYPES } from "../layerTypes";

export type State = {
  layers: Layer[];
  layerTypes: LayerType[];
  selectedLayers: string[];
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
    };

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
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LAYER":
      return {
        ...state,
        layers: [...state.layers, action.payload],
      };
    case "SELECT_LAYER":
      return {
        ...state,
        selectedLayers: [action.payload],
      };
    case "UPDATE_LAYER_CSS":
      return {
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
