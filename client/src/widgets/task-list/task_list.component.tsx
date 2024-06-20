import React from 'react';
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
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Add,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import BaseWidget from '../common/base-widget.component';

const Sidebar = () => {
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
    <BaseWidget widget_name='Tasks' >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" style={{ padding: '10px' }}>
          Projects
        </Typography>
        <IconButton>
          <Add />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={handleProjectsClick}>
          <ListItemText primary="Projects" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProjects} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['All projects (3)', 'Design system', 'User flow', 'Ux research'].map((text) => (
              <ListItem button key={text} style={{ paddingLeft: '30px' }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleTasksClick}>
          <ListItemText primary="Tasks" />
          {openTasks ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openTasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['All tasks (11)', 'To do (4)', 'In progress (4)', 'Done (3)'].map((text) => (
              <ListItem button key={text} style={{ paddingLeft: '30px' }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button>
          <ListItemText primary="Reminders" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Messengers" />
        </ListItem>
      </List>
      <Box mt="auto" mb={2} display="flex" justifyContent="center">
        <Typography variant="caption">Light</Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
        <Typography variant="caption">Dark</Typography>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </Box>
    </ BaseWidget>
  );
};

export default Sidebar;