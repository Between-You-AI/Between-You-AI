import React, { FC, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { QuestionTask } from 'core/models/question.type'

interface QuestionTaskProps {
  onNext: (amount: number) => {}
  questionTask: QuestionTask<string>
}

const QuestionTask2: FC<QuestionTaskProps> = ({ onNext, questionTask }) => {
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (amount < 1) {
      setError('The amount must be at least 1.')
    } else {
      setError('')
      onNext(amount)
    }
  }

  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // onSubmit(answers);
  };

  return (
    <Container maxWidth='sm' component='form' onSubmit={handleSubmit}>
      <Typography variant='h6' gutterBottom>
        {questionTask.question}
      </Typography>
      <TextField
        fullWidth
        label={questionTask.Answer.AnswerTypeCode}
        type='number'
        value={amount}
        onChange={e => setAmount(parseFloat(e.target.value))}
        error={!!error}
        helperText={error}
        required
        margin='normal'
      />
      <Button variant='contained' color='primary' onClick={handleNext}>
        Next
      </Button>
    </Container>
  )
}

export default QuestionTask2
