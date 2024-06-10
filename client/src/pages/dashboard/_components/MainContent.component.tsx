import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TaskCard from './TaskCard.component';

const MainContent: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        January, 11
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your task today
      </Typography>
      <Button variant="contained" color="primary">
        Add Task
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
        <TaskCard title="Create wireframe home screen" date="Today, Jan 11, 2022" />
        <TaskCard title="Create logo and brand guideline" date="Today, Jan 11, 2022" />
        <TaskCard title="Create design system for team" date="Today, Jan 11, 2022" />
      </Box>
    </Box>
  );
};

export default MainContent;