import React from "react";
import {Box, CircularProgress} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const CircularProgressWithIcon = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={75} // Change this value to control the progress percentage
        size={40} // Adjust size as needed
        thickness={4}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VisibilityIcon
          sx={{
            fontSize: 24, // Adjust the size of the icon as needed
            color: "black", // Adjust the color of the icon as needed
          }}
        />
      </Box>
    </Box>
  );
};
