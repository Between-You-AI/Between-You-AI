"use client";

import {Box} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawerComponent from "@/components/global/custom-drawer/custom-drawer.component";
import CustomAppBarComponent from "@/components/global/custom-app-bar/CustomAppBar.component";
import {FC, ReactNode, useState} from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({children}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: "flex", height: "100vh", width: "100%"}}>
      <CssBaseline />

      <CustomAppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />

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
        <CustomDrawerComponent
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
        <Box sx={{gridArea: "appbar"}} />
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
  );
};

export default DashboardLayout;
