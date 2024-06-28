'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createObjectivePlan, fetchObjectives, getObjectiveById } from '../services/objective.service'
import { Objective } from 'core/models/objective.type'
import queryClient from 'core/base/query-client'

const BASE_MODEL_KEY = 'objectives'

export const useObjectives = () => {
  return useQuery<Objective[], Error>({
    queryKey: [BASE_MODEL_KEY],
    queryFn: async () => {
      const data = await fetchObjectives()
      console.log(data)
      return data
    }
  })
}

export const getObjective = (id: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<Objective, Error>({
    queryKey: [BASE_MODEL_KEY, id],
    queryFn: async () => {
      const data = await getObjectiveById(id)
      console.log(data)
      return data
    }
  })
}

export const createObjective = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: (payload: { task_query: string }) => createObjectivePlan(payload),
    onSuccess: data => {
      queryClient.setQueryData([BASE_MODEL_KEY], (prev: Objective[]) => [...prev, data])
    }
  })
}
