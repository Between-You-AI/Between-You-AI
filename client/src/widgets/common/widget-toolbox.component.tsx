import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Box,
  createStyles,
  makeStyles,
} from "@mui/material";
import {Minimize, Close, CropSquare, UnfoldMore} from "@mui/icons-material";

// export const useStyles = createStyles(() =>
//   createStyles({
//     rotateIcon: {
//       animation: "$spin 2s linear infinite",
//     },
//     "@keyframes spin": {
//       "0%": {
//         transform: "rotate(360deg)",
//       },
//       "100%": {
//         transform: "rotate(0deg)",
//       },
//     },
//   })
// );
const TitleBar = ({widget_name = "Title"}) => {
  return (
    <Toolbar variant="dense" style={{minHeight: "40px"}}>
      <Typography variant="body1" style={{flexGrow: 1}}>
        {/* {widget_name} */}
      </Typography>
      <Box display="flex">
        <IconButton size="small">
          <UnfoldMore />
        </IconButton>
        <IconButton size="small">
          <Minimize />
        </IconButton>
        <IconButton size="small">
          <Close />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default TitleBar;
