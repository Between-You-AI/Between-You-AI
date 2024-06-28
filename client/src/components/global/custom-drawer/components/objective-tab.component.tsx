"use client";

import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CircularProgress from "@mui/material/CircularProgress";
import { Objective } from "core/models/objective.type";

interface ObjectiveTabProps {
  objective: Objective;
  open: boolean;
}

const ObjectiveTab: React.FC<ObjectiveTabProps> = ({objective, open}) => {
  console.log(objective);

  return (
    <ListItem key={objective.id} disablePadding sx={{display: "block"}}>
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
            value={objective.clarity}
            size={20}
          />
        </ListItemIcon>
        <ListItemText primary={objective.title} sx={{opacity: open ? 1 : 0}} />
      </ListItemButton>
    </ListItem>
  );
};
export default ObjectiveTab;
