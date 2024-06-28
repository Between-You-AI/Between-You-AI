"use client";

import React from "react";
import {useTheme} from "@mui/material/styles";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  ChevronLeft,
  ChevronRight,
  HelpOutline,
  History,
  Settings,
} from "@mui/icons-material";
import {DrawerHeader} from "../drawer-header/drawer-header.component";
import {useObjectives} from "core/queries/objective.query";

import * as _ from "lodash";
import {AdditionalTab} from "./components/additional-tab.component";
import {CustomDrawer} from "./customer-drawer.style";
import {ObjectiveTabList} from "./components/objective-tab-list.component";

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const CustomDrawerComponent: React.FC<DrawerProps> = ({
  open,
  handleDrawerClose,
}) => {
  const {data: objectives, error} = useObjectives();
  const theme = useTheme();

  return (
    <CustomDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      {objectives && <ObjectiveTabList objectives={objectives} open={open} />}
      <Divider />
      <List>
        <AdditionalTab tabName="Help" Icon={<HelpOutline />} open={open} />
        <AdditionalTab tabName="History" Icon={<History />} open={open} />
        <AdditionalTab tabName="Settings" Icon={<Settings />} open={open} />
      </List>
    </CustomDrawer>
  );
};

export default CustomDrawerComponent;
