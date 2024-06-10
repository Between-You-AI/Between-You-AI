import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface TaskCardProps {
  title: string;
  date: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, date }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="textSecondary">{date}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;