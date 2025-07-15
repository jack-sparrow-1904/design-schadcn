import { useReducer, useEffect } from "react";
import { Layer, LayerType } from "../types";
import { DEFAULT_LAYER_TYPES } from "../layerTypes";

/**
 * The state of the designer.
 */
export type State = {
  /**
   * The layers in the designer.
   */
  layers: Layer[];
  /**
   * The available layer types.
   */
  layerTypes: LayerType[];
  /**
   * The IDs of the selected layers.
   */
  selectedLayers: string[];
  /**
   * The history of the designer state.
   */
  history: State[];
  /**
   * The current index in the history.
   */
  historyIndex: number;
  /**
   * The zoom level of the canvas.
   */
  zoom: number;
  /**
   * The pan offset of the canvas.
   */
  pan: { x: number; y: number };
};

/**
 * The actions that can be dispatched to update the designer state.
 */
export type Action =
  | {
      type: "ADD_LAYER";
      payload: Layer;
    }
  | {
      type: "SELECT_LAYER";
      payload: { layerId: string; shiftKey: boolean };
    }
  | {
      type: "UPDATE_LAYER_CSS";
      payload: {
        id: string;
        css: Record<string, string>;
      };
    }
  | {
      type: "UPDATE_LAYER_VALUE";
      payload: {
        id: string;
        value: string;
      };
    }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_LAYERS"; payload: Layer[] }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SET_PAN"; payload: { x: number; y: number } };

const initialState: State = {
  layers: [],
  layerTypes: DEFAULT_LAYER_TYPES,
  selectedLayers: [],
  history: [],
  historyIndex: -1,
  zoom: 1,
  pan: { x: 0, y: 0 },
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
    case "SELECT_LAYER": {
      const { layerId, shiftKey } = action.payload;
      if (shiftKey) {
        if (state.selectedLayers.includes(layerId)) {
          return {
            ...state,
            selectedLayers: state.selectedLayers.filter((id) => id !== layerId),
          };
        } else {
          return {
            ...state,
            selectedLayers: [...state.selectedLayers, layerId],
          };
        }
      } else {
        return {
          ...state,
          selectedLayers: [layerId],
        };
      }
    }
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
    case "UPDATE_LAYER_VALUE": {
      const newState = {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.payload.id
            ? {
                ...layer,
                value: action.payload.value,
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
    case "SET_ZOOM":
      return { ...state, zoom: action.payload };
    case "SET_PAN":
      return { ...state, pan: action.payload };
    default:
      return state;
  }
};

/**
 * Props for the `useDesigner` hook.
 */
type UseDesignerProps = {
  /**
   * The initial layers for uncontrolled mode.
   */
  defaultLayers?: Layer[];
  /**
   * The current layers for controlled mode.
   */
  layers?: Layer[];
  /**
   * Callback for when the layers change in controlled mode.
   */
  onLayersChange?: (layers: Layer[]) => void;
};

/**
 * The core hook for the designer state management.
 */
export const useDesigner = ({
  defaultLayers,
  layers,
  onLayersChange,
}: UseDesignerProps) => {
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

  return { state, dispatch };
};
