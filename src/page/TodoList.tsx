import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import Layout from "../layout";
import { TaskType } from "../types";
import Pomodoro from "../components/Pomodoro";
import useStore, { StoreState } from "../stores/use-store";

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
    editTask,
    removeTask,
    finishTask,
    setSelectedTask,
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
        {tasks.map((task) => {
          return (
            <>
              <Flex
                key={task.id}
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
                  >
                    {task.title}
                  </Text>
                </Flex>
                <Menu>
                  <MenuButton>
                    <SettingsIcon />
                  </MenuButton>
                  <MenuList color={"#000"}>
                    <MenuItem>
                      <EditTask
                        task={task}
                        saveTask={(task) => editTask(task)}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => removeTask(task.id)}>
                      Remove
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          );
        })}
        <AddTask saveTask={(task) => addTask(task)} />
      </Flex>
    </Layout>
  );
}
