// components/CustomAppBar.js
import React from "react";
import {styled} from "@mui/material/styles";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {CircularProgressWithIcon} from "@/widgets/task-list/circular-progress-bar.component";
import {Box} from "@mui/material";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "60px", // Adjust the height here
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Light transparent background
  color: "black",
  boxShadow: "none", // Remove the shadow
  backdropFilter: "blur(10px)", // Optional: add blur effect
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomAppBarComponent: React.FC<AppBarProps> = ({
  open,
  handleDrawerOpen,
}) => {
  return (
    <CustomAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{marginRight: 5, ...(open && {display: "none"})}}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap>
          <Box component="span" sx={{display: "flex", alignItems: "center"}}>
            <Box component="span" sx={{mr: 1}}>
              <IconButton>
                <CircularProgressWithIcon value={50} />
              </IconButton>
            </Box>
            Objective
          </Box>
        </Typography>
      </Toolbar>
    </CustomAppBar>
  );
};

export default CustomAppBarComponent;
