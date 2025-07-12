import { useSelector, useDispatch } from "react-redux";
import { ITask } from "@/models/Task";
import { setLoading } from "@/store/slices/Auth/authSlice";
import { addTask, deleteTask, setTasks, updateTask } from "@/store/slices/Tasks/taskSlice";
import { AppDispatch, RootState } from "@/store";

export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, tasks } = useSelector((state: RootState) => state.task);

  const setLoadingState = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const setAllTasks = (tasks: ITask[]) => {
    dispatch(setTasks(tasks));
  };

  const addNewTask = (task: ITask) => {
    dispatch(addTask(task));
  };

  const updateExistingTask = (task: ITask) => {
    dispatch(updateTask(task));
  };

  const removeTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return {
    isLoading,
    tasks,
    setLoadingState,
    setAllTasks,
    addNewTask,
    updateExistingTask,
    removeTask,
  };
};