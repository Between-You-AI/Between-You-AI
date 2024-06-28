import { styled } from "@mui/material";
import { drawerWidth } from "./constants";
import { openedMixin } from "./mixins/openMixin";
import { closedMixin } from "./mixins/closeMixin";
import MuiDrawer from "@mui/material/Drawer";


export const CustomDrawer = styled(MuiDrawer, {
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