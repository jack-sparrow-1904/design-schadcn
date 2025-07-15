import { useContext } from "react";
import { DesignerContext } from "../../contexts/DesignerContext";

export const ActionSize = () => {
  const { state, dispatch } = useContext(DesignerContext);
  const selectedLayer = state.layers.find(
    (layer) => layer.id === state.selectedLayers[0]
  );

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayer) {
      dispatch({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: selectedLayer.id,
          css: { "--width": `${e.target.value}px` },
        },
      });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayer) {
      dispatch({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: selectedLayer.id,
          css: { "--height": `${e.target.value}px` },
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="width">Width</label>
        <input
          id="width"
          type="number"
          value={parseInt(selectedLayer?.cssVars?.["--width"] || "0", 10) || 0}
          onChange={handleWidthChange}
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="height">Height</label>
        <input
          id="height"
          type="number"
          value={parseInt(selectedLayer?.cssVars?.["--height"] || "0", 10) || 0}
          onChange={handleHeightChange}
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};
