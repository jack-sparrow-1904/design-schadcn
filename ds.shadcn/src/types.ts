import { CSSProperties, ReactNode } from "react";

export type Layer = {
  id: string;
  name: string;
  type: string;
  value: string;
  cssVars?: Record<string, string>;
  meta?: Record<string, unknown>;
  isLocked?: boolean;
};

export type LayerWithStyles = Layer & {
  style: CSSProperties;
  contentStyle: CSSProperties;
};

export type LayerType = {
  type: string;
  name: string;
  icon?: ReactNode;
  defaultValues: Omit<Layer, "id" | "type">;
  render: (layer: LayerWithStyles) => ReactNode;
  keybinding?: {
    key: string;
    label: string;
    labelMac: string;
    description: string;
    group: string;
  };
};
