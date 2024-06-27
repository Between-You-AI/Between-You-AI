// pages/index.js
import * as React from "react";
import {Box, Stack} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawerComponent from "@/components/global/custom-drawer/custom-drawer.component";
import CustomAppBarComponent from "@/components/global/custom-app-bar/CustomAppBar.component";
import TaskList from "@/widgets/task-list/task_list.component";
import FlowChartBar from "@/widgets/flow-chart-bar/FlowChartBar.component";
import MiddleComponent from "@/components/middle-component/middle-component";
import {Provider} from "@/utils/Providers";
import DashboardLayout from "../layout";
import DashboardTabs from "./dashboard-tabs.component";

const TaskComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [isInitialStage, setInitialStage] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const initialStageComplete = () => {
    setInitialStage(false);
  };

  return (
    <DashboardLayout>
        <Box sx={{flex: "0 0 25%", padding: 1, overflowY: "auto"}}>
          <TaskList />
        </Box>
      <Box
        sx={{
          flex: isInitialStage ? "1 1 100%" : "1 1 50%",
          padding: 1,
          height: "100vh",
        }}
      >
        <DashboardTabs />
      </Box>
        <Box sx={{flex: "0 0 25%", padding: 1, overflowY: "auto"}}>
          <FlowChartBar />
        </Box>
    </DashboardLayout>
  );
};

export default TaskComponent;
