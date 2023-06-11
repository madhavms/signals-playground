import "./App.css";
import { signal, computed } from "@preact/signals-react";
import { Workspaces } from "./Workspaces";

function createWorkspaceSignal(workspaces) {
  const workspaceSignals = signal({});
  Object.keys(workspaces).forEach((key) => {
    const workspace = workspaces[key];
    const workspaceSignal = signal(workspace);
    const templateInfoSignal = signal(workspace.templateInfo);
    const displayLabelSignal = signal(workspace.templateInfo.displayLabel);
    const descriptionSignal = signal(workspace.templateInfo.description);

    templateInfoSignal.value.displayLabel = displayLabelSignal;
    templateInfoSignal.value.description = descriptionSignal;

    workspaceSignal.value.templateInfo = templateInfoSignal;
    workspaceSignals.value[key] = workspaceSignal;
  });
  return workspaceSignals;
}

const workspaceSignal = createWorkspaceSignal(Workspaces);

const labels = computed(() => {
  return Object.values(workspaceSignal.value).map((workspace) => {
    return {
      id: workspace.value.id,
      labelName: workspace.value.templateInfo.value.displayLabel,
    };
  });
});

const descriptions = computed(() => {
  return Object.values(workspaceSignal.value).reduce((acc , workspace) => {
    return {
      ...acc,
      [workspace.value.id]: workspace.value.templateInfo.value.description
    };
  }, {});
});

console.log("descriptions", descriptions.value);

const handleLabelChange = (event, workspaceId) => {
  let currentLabel = labels.value.find((label) => label.id === workspaceId);
  console.log("currentLabel =", currentLabel);
  currentLabel.labelName.value = event.target.value;
  console.log("labels.value=", labels.value);
};

function App() {
  console.log("App rendered");
  return (
    <div className="App">
      {labels.value.map((label, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              value={label.labelName}
              onChange={(event) => handleLabelChange(event, label.id)}
            />
            <h1>Label: {label.labelName.value}</h1>
            <h2>Description: {descriptions.value[label.id].value}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
