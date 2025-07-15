import { useSelectedLayers } from "../../hooks/useSelectedLayers";
import { useDesignerAction } from "../../hooks/useDesignerAction";

export const ActionColor = () => {
  const selectedLayers = useSelectedLayers();
  const designerAction = useDesignerAction();
  const selectedLayer = selectedLayers[0];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayer) {
      designerAction({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: selectedLayer.id,
          css: { "--color": e.target.value },
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="color">Color</label>
        <input
          id="color"
          type="color"
          value={selectedLayer?.cssVars?.["--color"] || "#000000"}
          onChange={handleColorChange}
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};
