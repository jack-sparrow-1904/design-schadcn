import { ReactNode } from "react";
import { DesignerProvider } from "../contexts/DesignerContext";
import { useKeybindings } from "../hooks/useKeybindings";
import { Layer } from "../types";

/**
 * Props for the `Designer` component.
 */
type DesignerProps = {
  /**
   * The content of the designer.
   */
  children: ReactNode;
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
 * The main container for the designer.
 */
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
