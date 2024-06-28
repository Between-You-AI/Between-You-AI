import { CircularProgressWithIcon } from '@/widgets/task-list/circular-progress-bar.component'
import { Box, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const ObjectiveComponent: FC = ({}) => {
  const router = useRouter()
  const taskId = router.query.taskId

  return (
    taskId && (
      <Typography variant='h6' noWrap>
        <Box component='span' sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component='span' sx={{ mr: 1 }}>
            <IconButton>
              <CircularProgressWithIcon value={50} />
            </IconButton>
          </Box>
          Objective
        </Box>
      </Typography>
    )
  )
}
