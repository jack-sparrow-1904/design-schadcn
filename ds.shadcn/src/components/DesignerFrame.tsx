import { useContext } from "react";
import { DesignerContext } from "../contexts/DesignerContext";
import { LayerWithStyles } from "../types";

export const DesignerFrame = () => {
  const { state } = useContext(DesignerContext);

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
    >
      {state.layers.map((layer) => {
        const layerWithStyles: LayerWithStyles = {
          ...layer,
          style: {
            position: "absolute",
            ...layer.cssVars,
          },
          contentStyle: {
            ...layer.cssVars,
          },
        };
        // This is a placeholder for the actual layer rendering
        return (
          <div key={layer.id} style={layerWithStyles.style}>
            {layer.value}
          </div>
        );
      })}
    </div>
  );
};
