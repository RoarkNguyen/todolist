import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TaskType } from "../types";

export interface StoreState {
  tasks: TaskType[];
  selectedTask?: TaskType | null;

  setSelectedTask: (task: TaskType) => void;
  setTasks: (tasks: TaskType[]) => void;
  addTask: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
  removeTask: (id: string) => void;
  finishTask: (id: string) => void;
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        selectedTask: null,
        setTasks: (tasks) => set(() => ({ tasks })),

        addTask: (newTask) =>
          set((state) => {
            if (state.tasks.length === 0) {
              return {
                tasks: [...state.tasks, newTask],
                selectedTask: newTask,
              };
            } else {
              return { tasks: [...state.tasks, newTask] };
            }
          }),

        removeTask: (id) =>
          set((state) => {
            const updatedList = state.tasks.filter((item) => item.id !== id);
            if (state.tasks.length === 1) {
              return { tasks: updatedList, selectedTask: null };
            } else {
              
              return { tasks: updatedList };
            }
          }),

        editTask: (task) =>
          set((state) => {
            const updatedList = state.tasks.map((item) => {
              return item.id === task.id ? task : item;
            });
            return { tasks: updatedList };
          }),

        finishTask: (id) =>
          set((state) => {
            const updatedList = state.tasks.map((item) => {
              return item.id === id
                ? { ...item, isFinish: !item.isFinish }
                : item;
            });
            return { tasks: updatedList };
          }),

        setSelectedTask: (task) => set(() => ({ selectedTask: task })),
      }),
      { name: "store" }
    )
  )
);

export default useStore;
