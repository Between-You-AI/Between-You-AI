import { LargeNumberLike } from "crypto";

interface AppState {
  activeObjectiveId: number;
}


interface ActiveObjectiveState {
  activePhaseId: number;
  activeTaskId: number;
  activeActivityId: number;
}