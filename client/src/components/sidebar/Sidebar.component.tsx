import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, CircularProgress, Box, Button, Divider, Typography, ListItemButton, IconButton } from '@mui/material';

import { Add, Anchor, ExpandMore, HelpOutline, Settings, Menu, History } from '@mui/icons-material';
import { DrawerHeader } from './drawer-header.component';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: {
          width: collapsed ? '80px' : '300px',
          backgroundColor: '#F9F9F9',
          color: 'black',
          transition: 'width 0.2s',
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer} >
          <Menu />
        </IconButton>
      </DrawerHeader>
      <Box display="flex" flexDirection="column" height="100%">
        <Box p={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            style={{ display: collapsed ? 'none' : 'flex' }}
          >
            New chat
          </Button>
          <IconButton color="primary" style={{ display: collapsed ? 'flex' : 'none' }}>
            <Add />
          </IconButton>
        </Box>
        <List>
          {!collapsed && (
            <>
              <Typography variant="subtitle1" style={{ padding: '8px 16px' }}>
                Recent
              </Typography>
              <List>
                {['Design Tips for Finding ...', 'Friendship Feels Unbala...', 'Can you suggest videos ...', 'Identifying a Font', 'Date Conversation Starter'].map((text, index) => (
                  <ListItemButton key={text}>
                    <ListItemIcon>
                      <CircularProgress variant="determinate" value={85} size={20} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                ))}
              </List>
              <ListItemButton>
                <ListItemIcon>
                  <ExpandMore />
                </ListItemIcon>
                <ListItemText primary="Show more" />
              </ListItemButton>
            </>
          )}
        </List>
        <Box mt="auto" justifyContent={collapsed ? "center" : "space-between"}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <HelpOutline />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Help" />}
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <History />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Activity" />}
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Settings" />}
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;