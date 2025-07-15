import { useDesignerAction } from "../hooks/useDesignerAction";

export const ActionToolbarAddLayer = () => {
  const designerAction = useDesignerAction();

  const addLayer = () => {
    designerAction({
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
