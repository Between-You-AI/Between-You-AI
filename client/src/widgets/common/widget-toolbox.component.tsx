import React from 'react';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Minimize, Close, CropSquare } from '@mui/icons-material';

const TitleBar = ({ widget_name = 'Title' }) => {
  return (
    <Toolbar variant="dense" style={{ minHeight: '40px' }}>
      <Typography variant="body1" style={{ flexGrow: 1 }}>
        {widget_name}
      </Typography>
      <Box display="flex">
        <IconButton size="small">
          <CropSquare />
        </IconButton>
        <IconButton size="small">
          <Minimize />
        </IconButton>
        <IconButton size="small">
          <Close />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default TitleBar;