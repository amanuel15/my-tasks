import { STATUSES } from "./constants";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: STATUSES;
  history: STATUSES[];
  nextSteps: STATUSES[];
}
