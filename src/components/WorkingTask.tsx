import { SettingsIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import useStore from "../stores/use-store";
import { TaskType } from "../types";
import EditTask from "./EditTask";

export default function WorkingTask({ task }: { task: TaskType }) {
  const {
    editTask,
    selectedTask,
    toggleRemoveTask,
    finishTask,
    setSelectedTask,
  } = useStore();

  return (
    <Flex
      bg={task.id === selectedTask?.id ? "#3469cd" : "#d54747"}
      justifyContent={"space-between"}
      w="100%"
      px={4}
      color="#fff"
      width={[300, 400]}
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
      <Flex gap={"1rem"} align={"center"} flex={"1"}>
        <Checkbox
          size="lg"
          colorScheme="green"
          onChange={() => finishTask(task.id)}
          defaultChecked={task.isFinish}
        ></Checkbox>
        <Text
          as={task.isFinish ? "s" : "p"}
          fontSize="md"
          opacity={task.isFinish ? "0.7" : "1"}
          fontWeight="semibold"
          noOfLines={1}
          onClick={() => setSelectedTask(task)}
          flex={"1"}
          py="1.5rem"
        >
          {task.title} {task.seconds}
        </Text>
      </Flex>
      <Menu>
        <MenuButton>
          <SettingsIcon />
        </MenuButton>
        <MenuList color={"#000"}>
          <MenuItem>
            <EditTask task={task} saveTask={(task) => editTask(task)} />
          </MenuItem>
          <MenuItem onClick={() => toggleRemoveTask(task)}>Done</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
