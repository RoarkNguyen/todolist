import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TaskType } from "../types";

export interface StoreState {
  tabSelected: string;
  workingTasks: TaskType[];
  doneTasks: TaskType[];
  selectedTask?: TaskType | null;

  setSelectedTask: (task: TaskType) => void;
  setTimeSelectedTask: (task: TaskType, secondsRemain: number) => void;
  setWorkingTasks: (tasks: TaskType[]) => void;
  setDoneTasks: (tasks: TaskType[]) => void;

  addTask: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
  toggleRemoveTask: (task: TaskType) => void;
  finishTask: (id: string) => void;
  resetAllDoneTasks: () => void;
  doneAllTasks: () => void;
  finishTaskWhenTimeEnd: () => void;
  setTabSelected: (keyTab: string) => void;
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        workingTasks: [],
        doneTasks: [],
        tabSelected: "tasks",
        selectedTask: null,

        setWorkingTasks: (tasks) =>
          set(() => {
            return { workingTasks: tasks };
          }),

        setDoneTasks: (tasks) =>
          set(() => {
            return { doneTasks: tasks };
          }),

        setTabSelected: (tab: string) => set(() => ({ tabSelected: tab })),

        resetAllDoneTasks: () =>
          set((state) => {
            return { doneTasks: [] };
          }),

        doneAllTasks: () =>
          set((state) => {
            const updatedDoneTask = [...state.doneTasks, ...state.workingTasks];

            return {
              workingTasks: [],
              doneTasks: updatedDoneTask,
            };
          }),

        addTask: (newTask) =>
          set((state) => {
            if (state.workingTasks.length === 0) {
              return {
                workingTasks: [...state.workingTasks, newTask],
                selectedTask: newTask,
              };
            } else {
              return { workingTasks: [...state.workingTasks, newTask] };
            }
          }),

        // removeTask: (id) =>
        //   set((state) => {
        //     const updatedList = state.tasks.filter((item) => item.id !== id);
        //     if (state.tasks.length === 1) {
        //       return { tasks: updatedList, selectedTask: null };
        //     } else {

        //       return { tasks: updatedList };
        //     }
        //   }),

        toggleRemoveTask: (task) =>
          set((state) => {
            const updatedWorkingTask = state.workingTasks.filter(
              (item) => item.id !== task.id
            );
            const updatedDoneTask = [...state.doneTasks, task];

            return {
              workingTasks: updatedWorkingTask,
              doneTasks: updatedDoneTask,
            };
          }),

        editTask: (task) =>
          set((state) => {
            const updatedList = state.workingTasks.map((item) => {
              return item.id === task.id ? task : item;
            });
            return { workingTasks: updatedList };
          }),

        finishTask: (id) =>
          set((state) => {

            const updatedList = state.workingTasks.map((item) => {
              return item.id === id
                ? { ...item, isFinish: !item.isFinish }
                : item;
            });
            return { workingTasks: updatedList };
          }),

          finishTaskWhenTimeEnd: () =>
            set((state) => {
  
              const updatedList = state.workingTasks.map((item) => {
                return state.selectedTask?.id === item.id
                  ? { ...item, isFinish: true }
                  : item;
              });
              return { workingTasks: updatedList };
            }),

        setSelectedTask: (task) => set(() => ({ selectedTask: task })),
        setTimeSelectedTask: (task, secondsRemain) =>
          set((state) => {
            const updatedWorkingTask = state.workingTasks.map((item) => {
              return item.id === task.id
                ? { ...item, seconds: secondsRemain }
                : item;
            });
            return { workingTasks: updatedWorkingTask, selectedTask: { ...task, seconds: secondsRemain } }
          }),

      }),
      { name: "store" }
    )
  )
);

export default useStore;
