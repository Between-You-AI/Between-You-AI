export interface AppState {
  activeObjectiveId: number | null
  ActiveObjectiveState?: ActiveObjectiveState
}

export interface ActiveObjectiveState {
  activePhaseId: number
  activeTaskId: number
  activeActivityId: number
}

export const initalAppState: AppState = {
  activeObjectiveId: null
}

export const AppStateKey = 'APP_STATE'
