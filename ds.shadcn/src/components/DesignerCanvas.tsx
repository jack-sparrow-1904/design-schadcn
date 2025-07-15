import { ReactNode, useRef, WheelEvent } from "react";
import { useDesignerContext } from "../hooks/useDesignerContext";
import { useDesignerAction } from "../hooks/useDesignerAction";

export const DesignerCanvas = ({ children }: { children: ReactNode }) => {
  const { state } = useDesignerContext();
  const designerAction = useDesignerAction();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newZoom = state.zoom - e.deltaY * 0.01;
    designerAction({ type: "SET_ZOOM", payload: Math.max(0.1, newZoom) });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      designerAction({
        type: "SET_PAN",
        payload: {
          x: state.pan.x + e.movementX,
          y: state.pan.y + e.movementY,
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-grow h-full bg-white relative overflow-hidden"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          transform: `scale(${state.zoom}) translate(${state.pan.x}px, ${state.pan.y}px)`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
};
