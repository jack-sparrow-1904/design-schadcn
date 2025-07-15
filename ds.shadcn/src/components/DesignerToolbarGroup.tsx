import { ReactNode } from "react";

export const DesignerToolbarGroup = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-2 items-center">{children}</div>;
};
