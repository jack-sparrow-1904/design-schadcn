import { useState } from "react";
import { useDesignerContext } from "../hooks/useDesignerContext";
import { useLayers } from "../hooks/useLayers";
import { LayerWithStyles } from "../types";

export const DesignerFrame = () => {
  const { state, dispatch } = useDesignerContext();
  const layers = useLayers();
  const [dragging, setDragging] = useState<string | null>(null);
  const [resizing, setResizing] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleLayerClick = (e: React.MouseEvent<HTMLDivElement>, layerId: string) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_LAYER", payload: { layerId, shiftKey: e.shiftKey } });
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string
  ) => {
    setDragging(layerId);
    const layer = layers.find((l) => l.id === layerId);
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

  const handleResizeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string
  ) => {
    e.stopPropagation();
    setResizing(layerId);
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
    if (resizing) {
      const layer = layers.find((l) => l.id === resizing);
      if (layer) {
        const newWidth =
          e.clientX -
          (parseInt(layer.cssVars?.["--translate-x"] || "0", 10) || 0);
        const newHeight =
          e.clientY -
          (parseInt(layer.cssVars?.["--translate-y"] || "0", 10) || 0);
        dispatch({
          type: "UPDATE_LAYER_CSS",
          payload: {
            id: resizing,
            css: {
              "--width": `${newWidth}px`,
              "--height": `${newHeight}px`,
            },
          },
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
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
      {layers.map((layer) => {
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
            onClick={(e) => handleLayerClick(e, layer.id)}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
          >
            {layerType.render(layerWithStyles)}
            {isSelected && (
              <>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, layer.id)}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
