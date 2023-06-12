import "./App.css";
import { signal, computed } from "@preact/signals-react";
import { Workspaces } from "./Workspaces";
import TabsBar from "./components/TabsBar";

function createWorkspaceSignal(workspaces) {
  const workspaceSignals = signal({});
  Object.keys(workspaces).forEach((key) => {
    const workspace = workspaces[key];
    const workspaceSignal = signal(workspace);
    const templateInfoSignal = signal(workspace.templateInfo);
    const displayLabelSignal = signal(workspace.templateInfo.displayLabel);
    const descriptionSignal = signal(workspace.templateInfo.description);
    const isSelectedSignal = signal(workspace.templateInfo.isSelected);

    templateInfoSignal.value.displayLabel = displayLabelSignal;
    templateInfoSignal.value.description = descriptionSignal;
    templateInfoSignal.value.isSelected = isSelectedSignal;

    workspaceSignal.value.templateInfo = templateInfoSignal;
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
