import { useDesignerContext } from "../hooks/useDesignerContext";
import { useDesignerAction } from "../hooks/useDesignerAction";

export const ActionToolbarHistory = () => {
  const { state } = useDesignerContext();
  const designerAction = useDesignerAction();

  const handleUndo = () => {
    designerAction({ type: "UNDO" });
  };

  const handleRedo = () => {
    designerAction({ type: "REDO" });
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
