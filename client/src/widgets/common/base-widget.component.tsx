import { FC, ReactNode } from 'react';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Minimize, Close, CropSquare } from '@mui/icons-material';
import TitleBar from './widget-toolbox.component';

interface BaseWidgetProps {
  children: ReactNode;
  widget_name: string;
}

const BaseWidget: FC<BaseWidgetProps> = ({ children, widget_name }) => {
  return (
    <Box sx={{ width: '300px', height: '100%', padding: 0, overflowY: 'hidden' }}>
      <TitleBar widget_name={widget_name} />

      <Box sx={{ width: '100%', height: 'calc(100% - 40px)', padding: 0, overflowY: 'scroll' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseWidget;