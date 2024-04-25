import { Flex, Button, Text } from "@chakra-ui/react";
import DoneTask from "../components/DoneTask";
import Layout from "../layout";
import useStore from "../stores/use-store";

export default function DoneTasks() {
  const { tasks, resetAllDoneTasks } = useStore();
  const doneTasks = tasks.filter((task) => task.isRemoved);
  return (
    <Layout>
      <Flex flexDirection={"column"} gap="0.5rem">
        {doneTasks.length > 0 && (
          <Button
            onClick={resetAllDoneTasks}
            width={"400px"}
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
    </Layout>
  );
}
