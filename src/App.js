import "./App.css";
import TabsBar from "./components/TabsBar";
import { createWorkspace } from "./helpers/WorkspaceHelper";

const { getTabs, handleWorkspaceSelection, getSelectedTab, getDescription } =
  createWorkspace();

const tabs = getTabs();

function App() {
  return (
    <div className="App">
      <TabsBar
        tabs={tabs}
        handleWorkspaceSelection={handleWorkspaceSelection}
        selectedTab={getSelectedTab()}
      />
      <div className="description-container">{getDescription()}</div>
    </div>
  );
}

export default App;
