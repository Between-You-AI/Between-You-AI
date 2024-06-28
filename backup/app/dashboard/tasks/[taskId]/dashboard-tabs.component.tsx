"use client";

import React, {FC, ReactNode, useState} from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  CircularProgress,
  styled,
} from "@mui/material";
import {CircularProgressWithIcon} from "@/widgets/task-list/circular-progress-bar.component";
import QuestionTask2 from "@/components/questions/question-1.componen";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan" />}}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({theme}) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}
function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DashboardTabs: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: 0,
        boxShadow: "none",
        borderRadius: 1,
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{borderBottom: 1, borderColor: "divider", marginBottom: 2}}>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab
            icon={
              <CircularProgressWithIcon
                value={40}
                size={30}
                variant="determinate"
                isIconVisible={false}
              />
            }
          />
          <Tab
            icon={
              <CircularProgressWithIcon
                value={0}
                size={30}
                variant="determinate"
                isIconVisible={false}
              />
            }
          />
          <Tab
            icon={
              <CircularProgressWithIcon
                value={0}
                size={30}
                variant="determinate"
                isVisibleIcon={false}
                isIconVisible={false}
              />
            }
          />
          <Tab
            icon={
              <CircularProgressWithIcon
                value={20}
                size={30}
                variant="determinate"
                isIconVisible={false}
                isVisibleIcon={false}
              />
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <QuestionTask2 onNext={(n: number) => n + 1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5">1</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h5">3</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h5">2</Typography>
      </TabPanel>
    </Paper>
  );
};

export default DashboardTabs;
