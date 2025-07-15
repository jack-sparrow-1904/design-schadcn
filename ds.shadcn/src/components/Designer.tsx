import { ReactNode } from "react";
import { DesignerProvider } from "../contexts/DesignerContext";

export const Designer = ({ children }: { children: ReactNode }) => {
  return (
    <DesignerProvider>
      <div className="h-full w-full bg-gray-100">{children}</div>
    </DesignerProvider>
  );
};
