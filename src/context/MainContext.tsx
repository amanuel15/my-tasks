import React, {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { CreateTaskType, EditTaskType, TaskType } from "../types";
import { STATUSES } from "../constants";

interface MainContextInterface {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  createTask: (task: CreateTaskType) => void;
  editTask: (id: string, task: EditTaskType) => void;
  getTask: (id: string) => TaskType;
}

export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>(
    JSON.parse(localStorage.getItem("tasks")!) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (task: CreateTaskType) => {
    // Check if the task has a valid title
    if (task.title && task.title.trim()) {
      const newTask: TaskType = {
        id: String(Date.now()),
        title: task.title,
        description: task.description,
        status: STATUSES.ToDo,
        history: [STATUSES.ToDo],
        nextSteps: getNextSteps({ status: STATUSES.ToDo } as TaskType),
      };
      setTasks((tasks) => [newTask, ...tasks]);
    }
  };

  const editTask = (id: string, task: EditTaskType) => {
    setTasks((tasks) =>
      tasks.map((oldTask) => {
        if (oldTask.id === id) {
          if (task.title && task.title.trim()) {
            oldTask.title = task.title;
          }
          if (task.description) {
            oldTask.description = task.description;
          }
          if (task.status && task.status !== oldTask.status) {
            oldTask.status = task.status;
            oldTask.history = [task.status, ...oldTask.history];
            oldTask.nextSteps = getNextSteps(task as TaskType);
          }
        }
        return oldTask;
      })
    );
  };

  const getTask = (id: string) => {
    // Check if the task has a valid title
    return tasks.find((task) => task.id === id)!;
  };

  const mainContextValue: MainContextInterface = {
    tasks,
    setTasks,
    createTask,
    editTask,
    getTask,
  };

  const getNextSteps = (task: TaskType) => {
    switch (task.status) {
      case STATUSES.ToDo:
        return [task.status, STATUSES.InProgress];
      case STATUSES.InProgress:
        return [task.status, STATUSES.Blocked, STATUSES.InQA];
      case STATUSES.Blocked:
        return [task.status, STATUSES.ToDo];
      case STATUSES.InQA:
        return [task.status, STATUSES.Done, STATUSES.ToDo];
      case STATUSES.Done:
        return [task.status, STATUSES.Deployed];
      default:
        return [task.status];
    }
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};
