import { APIService } from 'core/base/base-api.service'
import { QuestionTask } from 'core/models/question.type'

const API_URI = 'questions'

export const fetchQuestions = async (payload: { task_query: string }): Promise<QuestionTask<string>[]> => {
  const response = await APIService.post(`/${API_URI}/`, payload)
  return response.data
}
