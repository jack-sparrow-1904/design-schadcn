import { useSelectedLayers } from "../../hooks/useSelectedLayers";
import { useDesignerAction } from "../../hooks/useDesignerAction";

export const ActionPosition = () => {
  const selectedLayers = useSelectedLayers();
  const designerAction = useDesignerAction();
  const selectedLayer = selectedLayers[0];

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayer) {
      designerAction({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: selectedLayer.id,
          css: { "--translate-x": `${e.target.value}px` },
        },
      });
    }
  };

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayer) {
      designerAction({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: selectedLayer.id,
          css: { "--translate-y": `${e.target.value}px` },
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="x-position">X</label>
        <input
          id="x-position"
          type="number"
          value={
            parseInt(selectedLayer?.cssVars?.["--translate-x"] || "0", 10) || 0
          }
          onChange={handleXChange}
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="y-position">Y</label>
        <input
          id="y-position"
          type="number"
          value={
            parseInt(selectedLayer?.cssVars?.["--translate-y"] || "0", 10) || 0
          }
          onChange={handleYChange}
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};
