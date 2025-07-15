import { ReactNode } from "react";
import { DesignerProvider } from "../contexts/DesignerContext";
import { useKeybindings } from "../hooks/useKeybindings";
import { Layer } from "../types";

type DesignerProps = {
  children: ReactNode;
  defaultLayers?: Layer[];
  layers?: Layer[];
  onLayersChange?: (layers: Layer[]) => void;
};

export const Designer = ({
  children,
  defaultLayers,
  layers,
  onLayersChange,
}: DesignerProps) => {
  useKeybindings();
  return (
    <DesignerProvider
      defaultLayers={defaultLayers}
      layers={layers}
      onLayersChange={onLayersChange}
    >
      <div className="h-full w-full bg-gray-100">{children}</div>
    </DesignerProvider>
  );
};
