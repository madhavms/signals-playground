import "./App.css";
import { signal, computed } from "@preact/signals-react";
import { Workspaces } from "./Workspaces";
import TabsBar from "./components/TabsBar";

function createWorkspaceSignal(workspaces) {
  const workspaceSignals = signal({});

  function createSignalObject(obj) {
    const signalObj = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        signalObj[key] = createSignalObject(value);
      } else {
        const propSignal = signal(value);
        signalObj[key] = propSignal;
      }
    });

    return signal(signalObj);
  }

  Object.keys(workspaces).forEach((key) => {
    const workspace = workspaces[key];
    const workspaceSignal = createSignalObject(workspace);
    workspaceSignals.value[key] = workspaceSignal;
  });

  return workspaceSignals;
}

const workspaceSignal = createWorkspaceSignal(Workspaces);

const currentWorkspace = computed(() => {
  return Object.values(workspaceSignal.value).find(
    (workspace) => workspace.value.templateInfo.value.isSelected.value
  );
});

const tabs = computed(() => {
  return Object.values(workspaceSignal.value).reduce((acc, workspace) => {
    return {
      ...acc,
      [workspace.value.id]: {
        id: workspace.value.id,
        labelName: workspace.value.templateInfo.value.displayLabel,
        isSelected: workspace.value.templateInfo.value.isSelected,
      },
    };
  }, {});
});

const handleWorkspaceSelection = (workspaceId) => {
  Object.keys(tabs.value).forEach((key) => {
    tabs.value[key].isSelected.value = tabs.value[key].id === workspaceId;
  });
};

function App() {
  return (
    <div className="App">
      <TabsBar
        tabs={tabs}
        handleWorkspaceSelection={handleWorkspaceSelection}
      />
      <div className="description-container">
        {currentWorkspace.value.value.templateInfo.value.description.value}
      </div>
    </div>
  );
}

export default App;
