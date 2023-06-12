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

  const getCurrentWorkspace = () => {
    return currentWorkspace.value;
  };

  const description = computed(() => {
    return getCurrentWorkspace().description;
  });

  const getDescription = () => {
    return description.value;
  };

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

  const getTabs = () => {
    return tabs.value;
  };

  const selectedTab = computed(() => {
    return Object.values(tabs.value).find((tab) => tab.isSelected.value)?.id;
  });

  const getSelectedTab = () => {
    return selectedTab.value;
  };

  const handleWorkspaceSelection = (workspaceId) => {
    Object.keys(tabs.value).forEach((key) => {
      tabs.value[key].isSelected.value = tabs.value[key].id === workspaceId;
    });
  };

  return {
    getCurrentWorkspace,
    getDescription,
    getTabs,
    handleWorkspaceSelection,
    getSelectedTab,
  };
};
