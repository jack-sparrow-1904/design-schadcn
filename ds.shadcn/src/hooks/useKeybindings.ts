import { useContext, useEffect } from "react";
import { DesignerContext } from "../contexts/DesignerContext";

export const useKeybindings = () => {
  const { state, dispatch } = useContext(DesignerContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      state.layerTypes.forEach((layerType) => {
        if (layerType.keybinding && e.key === layerType.keybinding.key) {
          dispatch({
            type: "ADD_LAYER",
            payload: {
              id: new Date().getTime().toString(),
              type: layerType.type,
              ...layerType.defaultValues,
            },
          });
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.layerTypes, dispatch]);
};
