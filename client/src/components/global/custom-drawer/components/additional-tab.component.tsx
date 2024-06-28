import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {FC, ReactNode} from "react";

interface AdditionalTabProps {
  Icon: ReactNode;
  tabName: string;
  open: boolean;
  func?: () => {};
}

export const AdditionalTab: FC<AdditionalTabProps> = ({Icon, tabName, open, func}) => {
  return (
    <ListItem key={tabName} disablePadding sx={{display: "block"}}>
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
          {Icon}
        </ListItemIcon>
        <ListItemText primary={tabName} sx={{opacity: open ? 1 : 0}} />
      </ListItemButton>
    </ListItem>
  );
};
