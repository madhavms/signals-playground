import "./App.css";
import TabsBar from "./components/TabsBar";
import { initialiseWorkspace, description } from "./helpers/workspaceStore";


initialiseWorkspace();


function App() {
  return (
    <div className="App">
      <TabsBar/>
      <div className="description-container">{description()}</div>
    </div>
  );
}

export default App;
