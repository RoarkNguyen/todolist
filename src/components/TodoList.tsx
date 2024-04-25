import { Box, Flex } from "@chakra-ui/react";
import useStore from "../stores/use-store";
import AddTask from "./AddTask";
import WorkingTask from "./WorkingTask";

export default function TodoList() {
  const { tasks, addTask, selectedTask } = useStore();
  const workingTasks = tasks.filter((task) => !task.isRemoved);
  return (
    <>
      {/* {selectTask && <Pomodoro task={selectTask} />} */}
      <Flex flexDirection={"column"} gap="0.5rem">
        {selectedTask && workingTasks.length > 0 && (
          <Box textAlign={"center"}>{selectedTask.title}</Box>
        )}
        {workingTasks.map((task) => {
          return <WorkingTask task={task} key={task.id} />;
        })}
        <AddTask saveTask={(task) => addTask(task)} />
      </Flex>
    </>
  );
}
