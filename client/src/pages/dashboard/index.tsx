// pages/index.js
import * as React from 'react'
import { Box } from '@mui/material'
import TaskList from '@/widgets/task-list/task_list.component'
import FlowChartBar from '@/widgets/flow-chart-bar/FlowChartBar.component'
import MiddleComponent from '@/components/middle-component/middle-component'
import DashboardLayout from './layout'

const MiniDrawer = () => {
  const [open, setOpen] = React.useState(false)
  const [isInitialStage, setInitialStage] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const initialStageComplete = () => {
    setInitialStage(false)
  }

  return (
    <DashboardLayout>
      {!isInitialStage && (
        <Box sx={{ flex: '0 0 25%', padding: 1, overflowY: 'auto' }}>
          <TaskList />
        </Box>
      )}
      <Box
        sx={{
          flex: isInitialStage ? '1 1 100%' : '1 1 50%',
          padding: 1,
          height: '100vh'
        }}
      >
        <MiddleComponent />
      </Box>
      {!isInitialStage && (
        <Box sx={{ flex: '0 0 25%', padding: 1, overflowY: 'auto' }}>
          <FlowChartBar />
        </Box>
      )}
    </DashboardLayout>
  )
}

export default MiniDrawer
