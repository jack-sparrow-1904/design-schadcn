import { CSSProperties, ReactNode } from "react";

/**
 * The core type representing a design layer on the canvas.
 */
export type Layer = {
  /**
   * Unique identifier for the layer.
   */
  id: string;
  /**
   * Display name of the layer.
   */
  name: string;
  /**
   * Layer type (e.g., "text", "image", "rectangle").
   */
  type: string;
  /**
   * Layer-specific content/value (e.g., text content, image URL).
   */
  value: string;
  /**
   * CSS custom properties for styling.
   */
  cssVars?: Record<string, string>;
  /**
   * Arbitrary metadata storage.
   */
  meta?: Record<string, unknown>;
  /**
   * Whether the layer is locked from editing.
   */
  isLocked?: boolean;
};

/**
 * Extended layer type that includes computed CSS styles for rendering.
 */
export type LayerWithStyles = Layer & {
  /**
   * Computed styles for the layer container.
   */
  style: CSSProperties;
  /**
   * Computed styles for the layer content.
   */
  contentStyle: CSSProperties;
};

/**
 * Configuration type that defines how a specific layer type behaves and renders.
 */
export type LayerType = {
  /**
   * Unique type identifier.
   */
  type: string;
  /**
   * Human-readable name.
   */
  name: string;
  /**
   * Icon for UI (string, component, or element).
   */
  icon?: ReactNode;
  /**
   * Default values for new layers.
   */
  defaultValues: Omit<Layer, "id" | "type">;
  /**
   * Render function for the layer.
   */
  render: (layer: LayerWithStyles) => ReactNode;
  /**
   * Optional keyboard shortcut.
   */
  keybinding?: {
    key: string;
    label: string;
    labelMac: string;
    description: string;
    group: string;
  };
};
