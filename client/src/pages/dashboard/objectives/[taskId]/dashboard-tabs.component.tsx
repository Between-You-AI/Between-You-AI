import React, { FC, ReactNode, useState } from 'react'
import { Box, Tabs, Tab, Typography, Paper, CircularProgress, styled } from '@mui/material'
import { CircularProgressWithIcon } from '@/widgets/task-list/circular-progress-bar.component'
import QuestionTask2 from '@/components/questions/question-1.componen'
import { useQuestions } from 'core/queries/questions.query'
import { useRouter } from 'next/router'
import { getObjective } from 'core/queries/objective.query'
import * as _ from 'lodash'

interface TabPanelProps {
  children: ReactNode
  value: number
  index: number
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const DashboardTabs: FC = () => {
  const router = useRouter()
  const taskId = router.query.taskId as unknown as string

  const { data: objective } = getObjective(taskId?.toString())

  const [value, setValue] = useState(0)
  const { data: questions, error } = useQuestions({ task_query: 'TO plan a trip to india' as unknown as string })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: 0,
        boxShadow: 'none',
        borderRadius: 1,
        backgroundColor: 'transparent'
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label='dashboard tabs'>
          {_.map(questions, (question, index) => (
            <Tab
              tabIndex={index}
              icon={<CircularProgressWithIcon value={100} size={30} variant='determinate' isIconVisible={false} />}
            />
          ))}
        </Tabs>
      </Box>
      {_.map(questions, (question, index) => (
        <TabPanel value={value} index={index}>
          <QuestionTask2 questionTask={question} onNext={(n: number) => n + 1} />
        </TabPanel>
      ))}

      {/* <TabPanel value={value} index={1}>
        <Typography variant='h5'>1</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant='h5'>3</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant='h5'>2</Typography>
      </TabPanel> */}
    </Paper>
  )
}

export default DashboardTabs
