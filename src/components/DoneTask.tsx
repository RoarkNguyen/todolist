import { Flex, Text } from "@chakra-ui/react";
import useStore from "../stores/use-store";
import { TaskType } from "../types";

export default function DoneTask({ task }: { task: TaskType }) {
  const { setSelectedTask } = useStore();

  return (
    <Flex
      bg="#d54747"
      justifyContent={"space-between"}
      w="100%"
      p={4}
      color="#fff"
      width={"400px"}
      align={"center"}
      rounded={8}
      cursor={"pointer"}
      borderLeft={"5px solid #d54747"}
      borderRadius={"6px"}
      _hover={{
        borderLeft: "5px solid black",
        transition: "0.25s",
      }}
    >
      <Flex gap={"1rem"} align={"center"}>
        <Text
          as={task.isRemoved ? "s" : "p"}
          fontSize="md"
          opacity={task.isRemoved ? "0.7" : "1"}
          fontWeight="semibold"
          noOfLines={1}
          onClick={() => setSelectedTask(task)}
        >
          {task.title}
        </Text>
      </Flex>
    </Flex>
  );
}
