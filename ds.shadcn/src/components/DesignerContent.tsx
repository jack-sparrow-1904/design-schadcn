import { ReactNode } from "react";

export const DesignerContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex h-full">{children}</div>;
};
