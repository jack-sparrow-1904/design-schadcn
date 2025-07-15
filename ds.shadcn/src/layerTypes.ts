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
    render: (layer) => (
      <div style={layer.contentStyle}>{layer.value}</div>
    ),
  },
];
