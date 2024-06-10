import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar.component';
import MainContent from './_components/MainContent.component';
import FlowChartBar from '@/components/flow-chart-bar/FlowChartBar.component';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Grid container spacing={2}>
        <Grid item md={8}>
          <MainContent />
        </Grid>
        <Grid item md={4}>
          <FlowChartBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;