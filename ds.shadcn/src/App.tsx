import { Designer } from "./components/Designer";
import { DesignerContent } from "./components/DesignerContent";
import { DesignerCanvas } from "./components/DesignerCanvas";
import { DesignerFrame } from "./components/DesignerFrame";
import { DesignerToolbar } from "./components/DesignerToolbar";
import { DesignerToolbarGroup } from "./components/DesignerToolbarGroup";
import { ActionToolbarAddLayer } from "./components/ActionToolbarAddLayer";
import { DesignerPanel } from "./components/DesignerPanel";
import { DesignerPane } from "./components/DesignerPane";
import { ActionPosition } from "./components/actions/ActionPosition";
import { ActionToolbarHistory } from "./components/ActionToolbarHistory";
import { ActionSize } from "./components/actions/ActionSize";
import "./index.css";

const initialLayers = [
  {
    id: "1",
    type: "text",
    name: "Text 1",
    value: "Hello World",
    cssVars: {
      "--width": "200px",
      "--height": "100px",
      "--translate-x": "100px",
      "--translate-y": "100px",
    },
  },
];

function App() {
  return (
    <div className="h-screen">
      <Designer defaultLayers={initialLayers}>
        <DesignerContent>
          <DesignerCanvas>
            <DesignerFrame />
          </DesignerCanvas>
          <DesignerPanel>
            <DesignerPane title="Position">
              <ActionPosition />
            </DesignerPane>
            <DesignerPane title="Size">
              <ActionSize />
            </DesignerPane>
          </DesignerPanel>
        </DesignerContent>
        <DesignerToolbar>
          <DesignerToolbarGroup>
            <ActionToolbarAddLayer />
          </DesignerToolbarGroup>
          <DesignerToolbarGroup>
            <ActionToolbarHistory />
          </DesignerToolbarGroup>
        </DesignerToolbar>
      </Designer>
    </div>
  );
}

export default App;
