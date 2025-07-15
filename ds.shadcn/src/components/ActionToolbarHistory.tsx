import { useContext } from "react";
import { DesignerContext } from "../contexts/DesignerContext";

export const ActionToolbarHistory = () => {
  const { state, dispatch } = useContext(DesignerContext);

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleUndo}
        disabled={state.historyIndex <= 0}
        className="bg-gray-700 text-white p-2 rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={state.historyIndex === state.history.length - 1}
        className="bg-gray-700 text-white p-2 rounded disabled:opacity-50"
      >
        Redo
      </button>
    </div>
  );
};
