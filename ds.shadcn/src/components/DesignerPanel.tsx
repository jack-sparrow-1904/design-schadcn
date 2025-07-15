import { ReactNode } from "react";

export const DesignerPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-80 bg-gray-100 border-l border-gray-300 p-4">
      {children}
    </div>
  );
};
