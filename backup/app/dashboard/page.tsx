"use client";

import * as React from "react";
import {Box} from "@mui/material";

import MiddleComponent from "@/components/middle-component/middle-component";
import DashboardLayout from "./layout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box
        sx={{
          flexGrow: 1,
          flex: "1 1 100%",
          padding: 1,
          height: "100vh",
        }}
      >
        <MiddleComponent />
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
