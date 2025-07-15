import { LayerType } from "./types";

export const DEFAULT_LAYER_TYPES: LayerType[] = [
  {
    type: "text",
    name: "Text",
    defaultValues: {
      name: "Text",
      value: "Hello World",
      cssVars: {
        "--font-size": "16px",
        "--color": "#000000",
        "--width": "100px",
        "--height": "50px",
      },
    },
    render: (layer) => <div style={layer.contentStyle}>{layer.value}</div>,
    keybinding: {
      key: "t",
      label: "T",
      labelMac: "T",
      description: "Add Text Layer",
      group: "Layer",
    },
  },
  {
    type: "image",
    name: "Image",
    defaultValues: {
      name: "Image",
      value: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop",
      cssVars: {
        "--width": "200px",
        "--height": "200px",
      },
    },
    render: (layer) => (
      <img
        src={layer.value}
        alt={layer.name}
        style={{ ...layer.contentStyle, objectFit: "cover" }}
      />
    ),
    keybinding: {
      key: "i",
      label: "I",
      labelMac: "I",
      description: "Add Image Layer",
      group: "Layer",
    },
  },
];
