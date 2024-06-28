import React from 'react'
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material'
import { AttachFile, Mic, Send } from '@mui/icons-material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createObjective } from 'core/queries/objective.query'
import Link from 'next/link'
import { useRouter } from 'next/router'

const schema = yup.object().shape({
  task_query: yup.string().min(8).required()
})

interface InitialGoalDTO {
  task_query: string
}

const MiddleComponent = () => {
  const createObjectivePlan = createObjective()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitHandler = (data: InitialGoalDTO) => {
    console.log({ data })
    createObjectivePlan.mutate(data)
    router.push('/dashboard/objectives/1')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
        width={'100%'}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          What are you looking to achieve?
        </Typography>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          p={2}
          borderRadius={2}
          mt={4}
          width='100%'
          maxWidth='600px'
        >
          <TextField
            fullWidth
            variant='outlined'
            defaultValue=''
            multiline
            {...register('task_query')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton>
                    <Mic />
                  </IconButton>
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <IconButton type='submit'>
                    <Send />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px'
                }
              }
            }}
          />
          <Box display='flex' justifyContent='center' gap={2} mt={2}>
            <Button variant='contained' color='primary'>
              Buy a House
            </Button>
            <Button variant='contained' color='primary'>
              Sell a House
            </Button>
            <Button variant='contained' color='primary'>
              How to become a PM
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default MiddleComponent
