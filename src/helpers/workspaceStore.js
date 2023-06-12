import { signal, computed } from "@preact/signals-react";
import workspacesData from "../Workspaces";

export const createWorkspace = () => {
  const workspaces = signal({});

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

  workspacesData.forEach((workspace) => {
    const workspaceSignal = createSignalObject(workspace);
    workspaces.value[workspace.id] = workspaceSignal;
  });

  const currentWorkspace = computed(() => {
    return Object.values(workspaces.value).find(
      (workspace) => workspace.value.isSelected.value
    ).value;
  });

  const description = computed(() => {
    return currentWorkspace.value.description;
  });


  const tabs = computed(() => {
    return Object.values(workspaces.value).reduce((acc, workspace) => {
      return {
        ...acc,
        [workspace.value.id]: {
          id: workspace.value.id,
          labelName: workspace.value.displayLabel,
          isSelected: workspace.value.isSelected,
        },
      };
    }, {});
  });

  const selectedTab = computed(() => {
    const selectedTabId = Object.values(tabs.value).find(
      (tab) => tab.isSelected.value
    )?.id.value;
    return selectedTabId || null;
  });

  

  const handleWorkspaceSelection = (workspaceId) => {
    Object.keys(tabs.value).forEach((key) => {
      return tabs.value[key].isSelected.value = tabs.value[key].id.value === workspaceId;
    });
  };


  return {
    currentWorkspace: () => currentWorkspace.value,
    description : () => description.value,
    tabs: () => tabs.value,
    handleWorkspaceSelection,
    selectedTab: () => selectedTab.value,
  };
};
