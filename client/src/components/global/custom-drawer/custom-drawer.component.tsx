// components/CustomDrawer.js
import React from "react";
import {styled, useTheme, Theme, CSSObject} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  HelpOutline,
  History,
  Settings,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { DrawerHeader } from "../drawer-header/drawer-header.component";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const CustomDrawerComponent: React.FC<DrawerProps> = ({
  open,
  handleDrawerClose,
}) => {
  const theme = useTheme();

  return (
    <CustomDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CircularProgress variant="determinate" value={85} size={20} />
              </ListItemIcon>
              <ListItemText primary={text} sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ExpandMore />
          </ListItemIcon>
          <ListItemText primary="Show more" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItem key="Help" disablePadding sx={{display: "block"}}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Help" sx={{opacity: open ? 1 : 0}} />
          </ListItemButton>
        </ListItem>
        <ListItem key="History" disablePadding sx={{display: "block"}}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <History />
            </ListItemIcon>
            <ListItemText primary="History" sx={{opacity: open ? 1 : 0}} />
          </ListItemButton>
        </ListItem>
        <ListItem key="Settings" disablePadding sx={{display: "block"}}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{opacity: open ? 1 : 0}} />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomDrawer>
  );
};

export default CustomDrawerComponent;
