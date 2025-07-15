import { Designer } from "./components/Designer";
import { DesignerContent } from "./components/DesignerContent";
import { DesignerCanvas } from "./components/DesignerCanvas";
import { DesignerFrame } from "./components/DesignerFrame";
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
      </Designer>
    </div>
  );
}

export default App;
