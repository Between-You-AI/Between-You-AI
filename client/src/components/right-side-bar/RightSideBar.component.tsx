import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const RightSidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recently tasks
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Send report" secondary="Dec 30, 2021" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Usability testing" secondary="Dec 28, 2021" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Create high fidelity login" secondary="Dec 25, 2021" />
        </ListItem>
      </List>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Daily plan
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress variant="determinate" value={78} size={60} />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="h4">78%</Typography>
            <Typography>7/10 completed</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RightSidebar;