import * as React from "react";
import {styled, useTheme, Theme, CSSObject} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import TaskList from "@/widgets/task-list/task_list.component";
import FlowChartBar from "@/widgets/flow-chart-bar/FlowChartBar.component";
import {CircularProgress, Grid, Stack} from "@mui/material";
import {DrawerHeader} from "@/components/sidebar/drawer-header.component";
import MiddleComponent from "@/components/middle-component/middle-component";
import {Provider} from "@/utils/Providers";
import {messageTypes} from "../../../core/base/websocket.type";
import {useQuery} from "@tanstack/react-query";
import {ExpandMore, HelpOutline, History, Settings} from "@mui/icons-material";

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
  width: calc(${theme.spacing(7)} + 1px),
  [theme.breakpoints.up("sm")]: {
    width: calc(${theme.spacing(8)} + 1px),
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: calc(100% - ${drawerWidth}px),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
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

export default function MiniDrawer() {
  // const {
  //   data: tasks,
  //   error,
  //   isLoading,
  // } = useQuery({queryKey: [messageTypes.TASK], initialData: []});

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isInitialStage, setInitialStage] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // TODO: Move this functionality as react-query state
  const initialStageComplete = () => {
    setInitialStage(false);
  };

  return (
    <Provider>
      <Box sx={{display: "flex", overflow:"hidden", height: '100vh'}}>
        <CssBaseline />
        
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => open ? handleDrawerClose() : handleDrawerOpen()}>
              <MenuIcon />
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
                    <CircularProgress
                      variant="determinate"
                      value={85}
                      size={20}
                    />
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
          <List>
            <ListItem key={'Help'} disablePadding sx={{display: "block"}}>
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
                <ListItemText primary={'Help'} sx={{opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'History'} disablePadding sx={{display: "block"}}>
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
                <ListItemText primary={'History'} sx={{opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Settings'} disablePadding sx={{display: "block"}}>
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
                <ListItemText primary={'Settings'} sx={{opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{flexGrow: 1, p: 0, overflow: "hidden"}}>
          <DrawerHeader />
          <Stack direction="row" spacing={2}>
            {!isInitialStage && <TaskList />}
            <Box width={isInitialStage ? "100%" : "50%"}>
              <MiddleComponent />
            </Box>
            {!isInitialStage && <FlowChartBar />}
          </Stack>
        </Box>
      </Box>
    </Provider>
  );
}