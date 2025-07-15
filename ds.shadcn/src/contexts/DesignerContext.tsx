import { createContext, ReactNode } from "react";
import { useDesigner, State, Action } from "../hooks/useDesigner";
import { Layer } from "../types";

export const DesignerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

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
  const designer = useDesigner({
    defaultLayers,
    layers,
    onLayersChange,
  });

  return (
    <DesignerContext.Provider value={designer}>
      {children}
    </DesignerContext.Provider>
  );
};
