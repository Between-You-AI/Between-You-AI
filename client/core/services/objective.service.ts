import { APIService } from 'core/base/base-api.service'
import { Objective } from 'core/models/objective.type'

const API_URI = 'objectives'
export const fetchObjectives = async (): Promise<Objective[]> => {
  const response = await APIService.get(`/${API_URI}`)
  return response.data
}

export const getObjectiveById = async (id: string): Promise<Objective> => {
  console.log('🚀 ~ getObjectiveById ~ `/${API_URI}/${id}`:', `/${API_URI}/${id}`)
  const response = await APIService.get(`/${API_URI}/${id}`)
  return response.data
}

export const createObjectivePlan = async (payload: { task_query: string }): Promise<Objective> => {
  const response = await APIService.post(`/${API_URI}`, payload)
  console.log('🚀 ~ createObjectivePlan ~ response:', response)
  return response.data
}
