import { Designer } from "./components/Designer";
import { DesignerContent } from "./components/DesignerContent";
import { DesignerCanvas } from "./components/DesignerCanvas";
import { DesignerFrame } from "./components/DesignerFrame";
import { DesignerToolbar } from "./components/DesignerToolbar";
import { DesignerToolbarGroup } from "./components/DesignerToolbarGroup";
import { ActionToolbarAddLayer } from "./components/ActionToolbarAddLayer";
import "./index.css";

function App() {
  return (
    <div className="h-screen">
      <Designer>
        <DesignerContent>
          <DesignerCanvas>
            <DesignerFrame />
          </DesignerCanvas>
        </DesignerContent>
        <DesignerToolbar>
          <DesignerToolbarGroup>
            <ActionToolbarAddLayer />
          </DesignerToolbarGroup>
        </DesignerToolbar>
      </Designer>
    </div>
  );
}

export default App;
