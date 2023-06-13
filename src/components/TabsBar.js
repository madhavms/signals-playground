import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import {
  tabs,
  selectedTab,
  handleWorkspaceSelection,
  addWorkspace,
  closeWorkspace,
} from "../helpers/workspaceStore";
import { signal } from "@preact/signals-react";

let count = signal(1);

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
  },
  closeButton: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: theme.spacing(1),
  },
  labelContainer: {
    display: "flex",
    alignItems: "center",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(0.1),
    backgroundColor: "#F5F5F5",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#0059b2",
    color: "white",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.20, 1),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
  addIcon: {
    marginRight: theme.spacing(0.25),
  },  
}));

function TabsBar() {
  const mode = "light";
  const classes = useStyles({ mode });

  const handleAddWorkspace = () => {
    const newWorkspace = {
      id: `f342336a-3594-4cd1-9b0f-152888146787${count}`,
      displayLabel: `New Workspace ${count}`,
      description: `This is New Workspace ${count}`,
      isSelected: false,
    };
    count.value++;
    addWorkspace(newWorkspace);
  };

  return (
    <div>
      <div className={classes.tabsContainer}>
        <Tabs
          value={selectedTab()}
          onChange={(e, newValue) => handleWorkspaceSelection(newValue)}
          indicatorColor="primary"
          textColor="primary"
          classes={{ indicator: classes.hiddenIndicator }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {Object.values(tabs()).map(({ id, isSelected, labelName }) => (
            <Tab
              key={id.value}
              label={
                <div className={classes.tabLabel}>
                  {labelName.value}
                  <span
                    className={classes.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWorkspace(id.value);
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
              }
              value={id.value}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </div>
      <div className={classes.addButtonContainer}>
        <button className={classes.addButton} onClick={handleAddWorkspace}>
          <AddIcon className={classes.addIcon} />
          Add Workspace
        </button>
      </div>
    </div>
  );
}

export default TabsBar;
