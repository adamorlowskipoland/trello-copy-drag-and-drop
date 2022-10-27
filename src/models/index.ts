export interface Task {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}
