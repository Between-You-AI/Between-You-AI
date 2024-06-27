import React, {FC} from "react";
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  styled,
} from "@mui/material";

import {Done, Visibility} from "@mui/icons-material";
import {OverridableComponent} from "@mui/material/OverridableComponent";

interface ProgressBarIconProps extends CircularProgressProps {
  isVisibleIcon?: boolean;
  isIconVisible?: boolean;
}

const CustomCircularProgress = styled(CircularProgress)(() => ({
  color: "#308fe8",
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
    strokeDasharray: "80px, 200px",
    strokeDashoffset: "2px",
  },
  // "& .MuiCircularProgress-circle": {
  //   color: "#e0e0e0",
  // }
  // "& .MuiCircularProgress-svg": {
  //   color: "#e0e0e0", // Unfilled part color
  // },
  // "& .MuiCircularProgress-circleDeterminate": {
  //   color: "#e0e0e0",
  // }
}));

export const CircularProgressWithIcon: FC<ProgressBarIconProps> = ({
  isVisibleIcon = true,
  isIconVisible = true,
  ...circularProgressProps
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CustomCircularProgress
        variant="determinate"
        {...circularProgressProps}
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
        {!isIconVisible ? (
          <></>
        ) : isVisibleIcon ? (
          <Visibility
            sx={{
              fontSize: 20, // Adjust the size of the icon as needed
              color: "black", // Adjust the color of the icon as needed
            }}
          />
        ) : (
          <Done
            sx={{
              fontSize: 20, // Adjust the size of the icon as needed
              color: "black", // Adjust the color of the icon as needed
            }}
          />
        )}
      </Box>
    </Box>
  );
};
