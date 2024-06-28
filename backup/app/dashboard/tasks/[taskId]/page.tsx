"use client";

// pages/index.js
import * as React from "react";
import {Box} from "@mui/material";

import TaskList from "@/widgets/task-list/task_list.component";
import FlowChartBar from "@/widgets/flow-chart-bar/FlowChartBar.component";
import DashboardLayout from "../../layout";
import DashboardTabs from "./dashboard-tabs.component";
import {getObjective} from "core/queries/objective.query";

const TaskPage = ({params}: {params: {taskId: string}}) => {
  const {data, error} = getObjective(params.taskId);
  console.log(data);
  return (
    <DashboardLayout>
      <Box sx={{flex: "0 0 25%", padding: 1, overflowY: "auto"}}>
        <TaskList />
      </Box>
      <Box
        sx={{
          flex: "1 1 50%",
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

export default TaskPage;
