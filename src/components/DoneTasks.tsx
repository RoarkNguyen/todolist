import { Button, Flex, Text } from "@chakra-ui/react";
import useStore from "../stores/use-store";
import DoneTask from "./DoneTask";
import { SortableItem } from "./SortTableItem";

export default function DoneTasks() {
  const { doneTasks, resetAllDoneTasks } = useStore();

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
        doneTasks.map((task) => (
          <SortableItem key={task.id} task={task}>
            <DoneTask task={task} />
          </SortableItem>
        ))
      ) : (
        <Text textAlign={"center"} mt="1rem">
          No completed tasks yet.
        </Text>
      )}
    </Flex>
  );
}
