export const messageTypes = {
  TASK: "tasks",
  OBJECTIVE: "objectives",
};

export type WebSocketMessage =
  | {type: "tasks"; data: Task}
  | {type: "objectives"; data: Objective};

export interface Task {
  id: string;
  name: string;
  // Add other task fields
}

export interface Objective {
  id: string;
  name: string;
  // Add other objective fields
}

export interface Progress {
  id: string;
  status: string;
  // Add other progress fields
}
