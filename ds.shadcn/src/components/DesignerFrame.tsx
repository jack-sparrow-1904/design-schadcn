import { useContext, useState } from "react";
import { DesignerContext } from "../contexts/DesignerContext";
import { LayerWithStyles } from "../types";

export const DesignerFrame = () => {
  const { state, dispatch } = useContext(DesignerContext);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleLayerClick = (layerId: string) => {
    dispatch({ type: "SELECT_LAYER", payload: layerId });
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string
  ) => {
    setDragging(layerId);
    const layer = state.layers.find((l) => l.id === layerId);
    if (layer) {
      const x =
        e.clientX -
        (parseInt(layer.cssVars?.["--translate-x"] || "0", 10) || 0);
      const y =
        e.clientY -
        (parseInt(layer.cssVars?.["--translate-y"] || "0", 10) || 0);
      setOffset({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      dispatch({
        type: "UPDATE_LAYER_CSS",
        payload: {
          id: dragging,
          css: {
            "--translate-x": `${newX}px`,
            "--translate-y": `${newY}px`,
          },
        },
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      className="relative bg-gray-200"
      style={{
        width: "1024px",
        height: "1024px",
        margin: "auto",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {state.layers.map((layer) => {
        const layerType = state.layerTypes.find((lt) => lt.type === layer.type);
        if (!layerType) {
          return null;
        }

        const isSelected = state.selectedLayers.includes(layer.id);

        const layerWithStyles: LayerWithStyles = {
          ...layer,
          style: {
            position: "absolute",
            width: layer.cssVars?.["--width"],
            height: layer.cssVars?.["--height"],
            transform: `translateX(${
              layer.cssVars?.["--translate-x"] || 0
            }) translateY(${layer.cssVars?.["--translate-y"] || 0})`,
            border: isSelected ? "2px solid #3b82f6" : "none",
            cursor: dragging === layer.id ? "grabbing" : "grab",
          },
          contentStyle: {
            ...layer.cssVars,
          },
        };

        return (
          <div
            key={layer.id}
            style={layerWithStyles.style}
            onClick={() => handleLayerClick(layer.id)}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
          >
            {layerType.render(layerWithStyles)}
          </div>
        );
      })}
    </div>
  );
};
