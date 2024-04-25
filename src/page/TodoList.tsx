import { Box, Flex } from "@chakra-ui/react";
import AddTask from "../components/AddTask";
import WorkingTask from "../components/WorkingTask";
import Layout from "../layout";
import useStore from "../stores/use-store";

let todoItems = [
  {
    id: "1",
    title: "This is the task 1",
    time: 25,
    isRemoved: false,
    isFinish: false,
  },
];

export default function TodoList() {
  const {
    tasks,
    addTask,

    selectedTask,
  } = useStore();
  console.log(selectedTask, "_selectedTask");
  console.log(tasks, "_tasks");

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
