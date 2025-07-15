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
import "./index.css";

function App() {
  return (
    <div className="h-screen">
      <Designer>
        <DesignerContent>
          <DesignerCanvas>
            <DesignerFrame />
          </DesignerCanvas>
          <DesignerPanel>
            <DesignerPane title="Position">
              <ActionPosition />
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
