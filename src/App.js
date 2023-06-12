import "./App.css";
import TabsBar from "./components/TabsBar";
import { createWorkspace } from "./helpers/WorkspaceHelper";

const { tabs, handleWorkspaceSelection, selectedTab, description } =
  createWorkspace();


function App() {
  return (
    <div className="App">
      <TabsBar
        tabs={tabs}
        handleWorkspaceSelection={handleWorkspaceSelection}
        selectedTab={selectedTab}
      />
      <div className="description-container">{description()}</div>
    </div>
  );
}

export default App;
