import { signal, computed } from "@preact/signals-react";
import workspacesData from "../Workspaces";

const workspacesSignal = signal({});

const currentWorkspaceSignal = computed(() => {
  return Object.values(workspacesSignal.value).find(
    (workspace) => workspace.value.isSelected.value
  ).value;
});

const descriptionSignal = computed(() => {
  return currentWorkspaceSignal.value.description;
});

const tabsSignal = computed(() => {
  return Object.values(workspacesSignal.value).reduce((acc, workspace) => {
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

const selectedTabSignal = computed(() => {
  const selectedTabId = Object.values(tabsSignal.value).find(
    (tab) => tab.isSelected.value
  )?.id.value;
  return selectedTabId || null;
});

export const currentWorkspace = () => currentWorkspaceSignal.value;
export const description = () => descriptionSignal.value;
export const tabs = () => tabsSignal.value;
export const selectedTab = () => selectedTabSignal.value;

export const handleWorkspaceSelection = (workspaceId) => {
  Object.keys(tabsSignal.value).forEach((key) => {
    return (tabsSignal.value[key].isSelected.value =
      tabsSignal.value[key].id.value === workspaceId);
  });
};

export const initialiseWorkspace = () => {
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
    workspacesSignal.value[workspace.id] = workspaceSignal;
  });
};
