import { ReactNode } from "react";

export const DesignerCanvas = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-grow h-full bg-white relative">{children}</div>
  );
};
