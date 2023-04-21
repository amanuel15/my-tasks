import React, {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { TaskType } from "../types";
import { STATUSES } from "../constants";

interface MainContextInterface {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  createTask: (task: TaskType) => void;
  editTask: (id: string, task: TaskType) => void;
}

export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>(
    JSON.parse(localStorage.getItem("tasks")!) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (task: TaskType) => {
    // Check if the task has a valid title
    if (task.title && task.title.trim()) {
      const newTask: TaskType = {
        id: String(Date.now()),
        title: task.title,
        description: task.description,
        status: STATUSES.ToDo,
        history: [STATUSES.ToDo],
        nextSteps: getNextSteps(task),
      };
      setTasks((tasks) => [newTask, ...tasks]);
    }
  };

  const editTask = (id: string, task: TaskType) => {
    setTasks((tasks) =>
      tasks.map((oldTask) => {
        if (task.id === id) {
          if (task.title && task.title.trim()) {
            oldTask.title = task.title;
          }
          if (task.description) {
            oldTask.description = task.description;
          }
          if (task.status && task.status !== oldTask.status) {
            oldTask.status = task.status;
            oldTask.history = [task.status, ...oldTask.history];
            oldTask.nextSteps = getNextSteps(task);
          }
        }
        return oldTask;
      })
    );
  };

  const mainContextValue: MainContextInterface = {
    tasks,
    setTasks,
    createTask,
    editTask,
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
