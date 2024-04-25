import { Box, Flex } from "@chakra-ui/react";
import AddTask from "../components/AddTask";
import WorkingTask from "../components/WorkingTask";
import Layout from "../layout";
import useStore from "../stores/use-store";

export default function TodoList() {
  const { tasks, addTask, selectedTask } = useStore();

  return (
    <Layout>
      {/* {selectTask && <Pomodoro task={selectTask} />} */}
      <Flex flexDirection={"column"} gap="0.5rem">
        {selectedTask && tasks.length > 0 && (
          <Box textAlign={"center"}>{selectedTask.title}</Box>
        )}
        {tasks
          .filter((task) => !task.isRemoved && task)
          .map((task) => {
            return <WorkingTask task={task} key={task.id} />;
          })}
        <AddTask saveTask={(task) => addTask(task)} />
      </Flex>
    </Layout>
  );
}
