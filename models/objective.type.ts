interface User {
  id: number;
  email: string;
  password: string;
}

interface UserPermission {
  id: number;
  User: User;
  Objective: Objective;
  PermissionType: String;
}

interface Dependency {
  activity: Activity;
  type: "FIFO, LIFO, FILO, LILO";
}

interface Activity {
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
interface Relation {
  task: Task;
  type: "FIFO, LIFO, FILO, LILO";
}

interface Task {
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

interface Step {
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

interface Phase {
  name: string;
  description: string;
  PhaseBefore: Phase;
  PhaseAfter: Phase;
  duration: number;
  start_time: Date;
  end_time: Date;
  Steps: Step[];
}

interface Objective {
  id: string;
  title: string;
  clarity: number;
  description: string;
  completion_date: Date;
  created_at: Date;
  Owner: User;
  Collaborators: User[];
  Permissions: UserPermission[];
  Phases: Phase[];
}
