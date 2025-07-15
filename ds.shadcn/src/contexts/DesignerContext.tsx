import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Layer } from "../types";

export type State = {
  layers: Layer[];
};

export type Action = {
  type: "ADD_LAYER";
  payload: Layer;
};

const initialState: State = {
  layers: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LAYER":
      return {
        ...state,
        layers: [...state.layers, action.payload],
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
