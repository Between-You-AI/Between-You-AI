import { CircularProgressWithIcon } from '@/widgets/task-list/circular-progress-bar.component'
import { Box, IconButton, Typography } from '@mui/material'
import { getObjective } from 'core/queries/objective.query'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const ObjectiveComponent: FC = ({}) => {
  const router = useRouter()
  const taskId = router.query.taskId as unknown as string

  const { data: objective, error } = getObjective(taskId?.toString())

  return (
    taskId &&
    objective && (
      <Typography variant='h6' noWrap>
        <Box component='span' sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component='span' sx={{ mr: 1 }}>
            <IconButton>
              <CircularProgressWithIcon value={objective.clarity} />
            </IconButton>
          </Box>
          {objective.title}
        </Box>
      </Typography>
    )
  )
}
