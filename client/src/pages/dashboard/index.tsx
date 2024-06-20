import React from 'react';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar.component';
import MainContent from './_components/MainContent.component';
import TaskList from '@/widgets/task-list/task_list.component';
import FlowChartBar from '@/widgets/flow-chart-bar/FlowChartBar.component';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <div className='app'>
        <div className='nav-bar'>
          <Sidebar />
        </div>
        <div className='main'>
          <Grid container justifyContent={'space-between'}>

            <main className='content'>
              <Grid container justifyContent={'space-between'} spacing={1} >
                <Grid md={2}>
                  <TaskList />
                </Grid>
                <Grid md={6}>
                  <MainContent />
                </Grid>
                <Grid md={2}>
                  <FlowChartBar />
                </Grid>
              </Grid>
            </main>
          </Grid>
        </div>

      </div>
    </Box >
  );
};

export default Dashboard;