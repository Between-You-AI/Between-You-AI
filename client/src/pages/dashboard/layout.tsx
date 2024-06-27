// pages/index.js
import {Box, Stack} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawerComponent from "@/components/global/custom-drawer/custom-drawer.component";
import CustomAppBarComponent from "@/components/global/custom-app-bar/CustomAppBar.component";
import TaskList from "@/widgets/task-list/task_list.component";
import FlowChartBar from "@/widgets/flow-chart-bar/FlowChartBar.component";
import MiddleComponent from "@/components/middle-component/middle-component";
import {Provider} from "@/utils/Providers";
import { FC, ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({children}) => {
  const [open, setOpen] = useState(false);
  const [isInitialStage, setInitialStage] = useState(false);

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
    <Provider>
      <Box sx={{display: "flex", height: "100vh"}}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            display: "grid",
            gridTemplateColumns: open ? "240px 1fr" : "72px 1fr",
            gridTemplateRows: "auto 1fr",
            gridTemplateAreas: `
              "drawer appbar"
              "drawer content"
            `,
            marginTop: "48px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <CustomAppBarComponent
            open={open}
            handleDrawerOpen={handleDrawerOpen}
          />
          <CustomDrawerComponent
            open={open}
            handleDrawerClose={handleDrawerClose}
          />
          <Box
            sx={{
              gridArea: "content",
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
              padding: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Provider>
  );
};

export default DashboardLayout;
