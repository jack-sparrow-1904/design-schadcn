import { useLayers } from "../hooks/useLayers";
import { useDesignerAction } from "../hooks/useDesignerAction";
import { useSelectedLayers } from "../hooks/useSelectedLayers";

export const PaneLayerTree = () => {
  const layers = useLayers();
  const selectedLayers = useSelectedLayers();
  const designerAction = useDesignerAction();

  const handleLayerClick = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string
  ) => {
    e.stopPropagation();
    designerAction({
      type: "SELECT_LAYER",
      payload: { layerId, shiftKey: e.shiftKey },
    });
  };

  return (
    <div>
      {layers.map((layer) => (
        <div
          key={layer.id}
          onClick={(e) => handleLayerClick(e, layer.id)}
          className={`p-2 cursor-pointer ${
            selectedLayers.some((l) => l.id === layer.id) ? "bg-blue-200" : ""
          }`}
        >
          {layer.name}
        </div>
      ))}
    </div>
  );
};
