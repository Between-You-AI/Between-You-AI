export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserPermission {
  id: number;
  User: User;
  Objective: Objective;
  PermissionType: String;
}

export interface Dependency {
  activity: Activity;
  type: "FIFO, LIFO, FILO, LILO";
}

export interface Activity {
  name: string;
  description: string;
  AssignedTo: User;
  ActivityType: string;
  cost: number;
  duration: number;
  AssignedBy: User;
  start_date: Date;
  completion_date: Date;
  order: number;
}
export interface Relation {
  task: Task;
  type: "FIFO, LIFO, FILO, LILO";
}

export interface Task {
  name: string;
  description: string;
  duration: number;
  start_time: Date;
  end_time: Date;
  Budget: number;
  order: number;
  relatedTo: Relation;
  Activities: Activity[];
}

export interface Step {
  name: string;
  decription: string;
  assignedTo: User;
  assignedBy: User;
  duration: number;
  start_time: Date;
  end_time: Date;
  order: number;
  Tasks: Task[];
}

export interface Phase {
  name: string;
  description: string;
  PhaseBefore: Phase;
  PhaseAfter: Phase;
  duration: number;
  start_time: Date;
  end_time: Date;
  Steps: Step[];
}

export interface Objective {
  id: string;
  title: string;
  clarity: number;
  description: string;
  completion_date: Date;
  created_at: Date;
  Owner: User;
  Collaborators?: User[];
  Permissions?: UserPermission[];
  Phases?: Phase[];
}
