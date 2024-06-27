import {FC, ReactNode} from "react";
import {Toolbar, Typography, IconButton, Box} from "@mui/material";
import {Minimize, Close, CropSquare} from "@mui/icons-material";
import TitleBar from "./widget-toolbox.component";

interface BaseWidgetProps {
  children: ReactNode;
  widget_name: string;
  width: number | string;
}

const BaseWidget: FC<BaseWidgetProps> = ({children, widget_name, width}) => {
  return (
    <Box
      sx={{
        width: width,
        height: "100%",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TitleBar widget_name={widget_name} />
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          padding: 0,
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BaseWidget;
