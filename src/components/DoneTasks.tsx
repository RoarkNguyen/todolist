import { Button, Flex, Text } from "@chakra-ui/react";
import useStore from "../stores/use-store";
import DoneTask from "./DoneTask";

export default function DoneTasks() {
  const { tasks, resetAllDoneTasks } = useStore();
  const doneTasks = tasks.filter((task) => task.isRemoved);
  return (
    <Flex flexDirection={"column"} gap="0.5rem">
      {doneTasks.length > 0 && (
        <Button
          onClick={resetAllDoneTasks}
          width={[300, 400]}
          mt={"0.5rem"}
          h={"56px"}
          borderRadius={"6px"}
        >
          Delete all tasks
        </Button>
      )}

      {doneTasks.length > 0 ? (
        doneTasks.map((task) => {
          return <DoneTask task={task} key={task.id} />;
        })
      ) : (
        <Text textAlign={"center"} mt="1rem">
          No completed tasks yet.
        </Text>
      )}
    </Flex>
  );
}
