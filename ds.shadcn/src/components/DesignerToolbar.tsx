import { ReactNode } from "react";

export const DesignerToolbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white p-2 rounded-lg shadow-lg flex gap-2">
      {children}
    </div>
  );
};
