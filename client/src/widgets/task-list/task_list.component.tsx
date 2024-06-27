import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Switch,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Add,
  Brightness4,
  Brightness7,
  VisibilityOutlined,
} from "@mui/icons-material";
import BaseWidget from "../common/base-widget.component";
import {CircularProgressWithIcon} from "./circular-progress-bar.component";

const TaskList = () => {
  const [openProjects, setOpenProjects] = React.useState(true);
  const [openTasks, setOpenTasks] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleProjectsClick = () => {
    setOpenProjects(!openProjects);
  };

  const handleTasksClick = () => {
    setOpenTasks(!openTasks);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BaseWidget widget_name="Tasks" width={'240px'}>

      <List>
        <ListItem button onClick={handleProjectsClick}>
          <ListItemText primary="Objectives" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProjects} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "All projects (3)",
              "Design system",
              "User flow",
              "Ux research",
            ].map((text) => (
              <ListItem button key={text} style={{paddingLeft: "30px"}}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleTasksClick}>
          <ListItemText primary="Tasks" />
          {openTasks ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem button onClick={handleProjectsClick}>
          <ListItemText primary="Objectives" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProjects} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "All projects (3)",
              "Design system",
              "User flow",
              "Ux research",
            ].map((text) => (
              <ListItem button key={text} style={{paddingLeft: "30px"}}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem button onClick={handleProjectsClick}>
          <ListItemText primary="Objectives" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProjects} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "All projects (3)",
              "Design system",
              "User flow",
              "Ux research",
            ].map((text) => (
              <ListItem button key={text} style={{paddingLeft: "30px"}}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Collapse in={openTasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"].map(
              (text) => (
                <ListItem button key={text} style={{paddingLeft: "30px"}}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Collapse>
        <Collapse>
          <List component="div" disablePadding>
            {["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"].map(
              (text) => (
                <ListItem button key={text} style={{paddingLeft: "30px"}}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Collapse>

        <Collapse>
          <List component="div" disablePadding>
            {["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"].map(
              (text) => (
                <ListItem button key={text} style={{paddingLeft: "30px"}}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Collapse>
        <Collapse>
          <List component="div" disablePadding>
            {["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"].map(
              (text) => (
                <ListItem button key={text} style={{paddingLeft: "30px"}}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Collapse>
      </List>
    </BaseWidget>
  );
};

export default TaskList;
