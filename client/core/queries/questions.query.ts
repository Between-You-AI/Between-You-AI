import { useQuery } from '@tanstack/react-query'
import { QuestionTask } from 'core/models/question.type'
import { fetchQuestions } from 'core/services/questions.service'

const BASE_MODEL_KEY = 'questions'

export const useQuestions = (payload: { task_query: string }) => {
  return useQuery({
    queryKey: [BASE_MODEL_KEY],
    queryFn: async () => {
      const data = await fetchQuestions(payload)
      console.log(data)
      return data
    }
  })
}
