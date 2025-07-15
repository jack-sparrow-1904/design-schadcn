import { ReactNode } from "react";
import { useSelectedLayers } from "../hooks/useSelectedLayers";

export const DesignerPane = ({
  title,
  children,
  showForLayerTypes,
}: {
  title: string;
  children: ReactNode;
  showForLayerTypes?: string[];
}) => {
  const selectedLayers = useSelectedLayers();

  if (
    showForLayerTypes &&
    !selectedLayers.some((layer) => showForLayerTypes.includes(layer.type))
  ) {
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};
