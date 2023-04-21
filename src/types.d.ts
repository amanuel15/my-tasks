import { STATUSES } from "./constants";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: STATUSES;
  history: STATUSES[];
  nextSteps: STATUSES[];
}

export interface CreateTaskType {
  title: string;
  description: string;
}

export interface EditTaskType {
  title: string;
  description: string;
  status: STATUSES;
}
