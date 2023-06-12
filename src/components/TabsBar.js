import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CloseIcon from "@material-ui/icons/Close";
import { signal } from "@preact/signals-react";

const useStyles = makeStyles((theme) => ({
  hiddenIndicator: {
    display: "none",
  },
  closeIcon: {
    color: "white",
    verticalAlign: "middle",
  },
  closeIconSelected: {
    color: (props) => (props.mode === "light" ? "#0059b2" : "white"),
    verticalAlign: "middle",
  },
  tabs: {
    flexGrow: 1,
  },
  tabsContainer: {
    backgroundColor: "black",
    paddingTop: theme.spacing(1.2),
  },
  tab: {
    color: "white",
    backgroundColor: "black",
    fontSize: "0.8rem",
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    borderBottom: "None",
    "&:hover": {
      opacity: "0.7",
    },
    "&.Mui-selected:hover": {
      opacity: "1",
    },
    "&.Mui-selected": {
      backgroundColor: "#F5F5F5",
      color: "#0059b2",
    },
    "&.Mui-focusVisible": {
      backgroundColor: (props) =>
        props.mode === "light" ? "#F5F5F5" : "#001e3c",
    },
    closeButton: {
      marginLeft: theme.spacing(1),
      padding: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      marginLeft: theme.spacing(1),
    },
    labelContainer: {
      display: "flex",
      alignItems: "center",
    },
  },
}));

function TabsBar({
  tabs,
  handleWorkspaceSelection,
  handleCloseWorkspace,
  handleTabRename,
}) {
  const mode = "light";
  const classes = useStyles({ mode });
  const selectedTab = Object.values(tabs.value).find(
    (tab) => tab.isSelected.value
  )?.id;

  const renamingTab = signal(null);

  const handleDoubleClick = (tabId) => {
    renamingTab.value = tabId;
  };

  const handleTabRenameConfirm = (event, tabId) => {
    if (event.key === "Enter") {
      handleTabRename(tabId, event.target.value);
      renamingTab.value = null;
    }
  };

  return (
    <div className={classes.tabsContainer}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => handleWorkspaceSelection(newValue)}
        indicatorColor="primary"
        textColor="primary"
        classes={{ indicator: classes.hiddenIndicator }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {Object.values(tabs.value).map(({ id, isSelected, labelName }) => (
          <Tab
            key={id}
            label={
              renamingTab === id ? (
                <input
                  type="text"
                  autoFocus
                  value={labelName.value}
                  onChange={() => {}}
                  onKeyDown={(event) => handleTabRenameConfirm(event, id)}
                  onBlur={() => (renamingTab.value = null)}
                  className={classes.labelInput}
                />
              ) : (
                <div
                  className={classes.tabLabel}
                  onDoubleClick={() => handleDoubleClick(id)}
                >
                  {labelName.value}
                  <span
                    className={classes.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseWorkspace(id);
                    }}
                    size="small"
                  >
                    <CloseIcon
                      fontSize="small"
                      className={
                        isSelected.value
                          ? classes.closeIconSelected
                          : classes.closeIcon
                      }
                    />
                  </span>
                </div>
              )
            }
            value={id}
            className={classes.tab}
          />
        ))}
      </Tabs>
    </div>
  );
}

export default TabsBar;
