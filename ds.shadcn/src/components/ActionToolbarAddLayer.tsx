import { useContext } from "react";
import { DesignerContext } from "../contexts/DesignerContext";

export const ActionToolbarAddLayer = () => {
  const { dispatch } = useContext(DesignerContext);

  const addLayer = () => {
    dispatch({
      type: "ADD_LAYER",
      payload: {
        id: new Date().getTime().toString(),
        type: "text",
        name: "New Text",
        value: "New Text",
        cssVars: {
          "--width": "100px",
          "--height": "50px",
          "--translate-x": "200px",
          "--translate-y": "200px",
        },
      },
    });
  };

  return (
    <button
      onClick={addLayer}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Add Layer
    </button>
  );
};
