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
import { useState } from "react";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import Layout from "../layout";
import { TaskType } from "../types";

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
  const [listTask, setListTask] = useState(todoItems);

  const finishItem = (id: string) => {
    setListTask((prevState) => {
      const updatedList = prevState.map((item) => {
        return item.id === id ? { ...item, isFinish: !item.isFinish } : item;
      });
      return updatedList;
    });
  };

  const addTask = (task: TaskType) => {
    setListTask((pre) => [...pre, task]);
  };

  const editTask = (task: TaskType) => {
    setListTask((prevState) => {
      const updatedList = prevState.map((item) => {
        return item.id === task.id ? task : item;
      });
      return updatedList;
    });
  };

  const removeItem = (id: string) => {
    setListTask((prevState) => {
      const updatedList = prevState.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  return (
    <Layout>
      <Flex flexDirection={"column"} gap="0.5rem">
        {listTask.map((task) => {
          return (
            <>
              <Flex
                key={task.id}
                bg="#d54747"
                justifyContent={"space-between"}
                w="100%"
                p={4}
                color="#fff"
                width={"300px"}
                align={"center"}
                rounded={8}
                cursor={"pointer"}
                borderLeft={"5px solid #d54747"}
                _hover={{
                  borderLeft: "5px solid black",
                  transition: "0.25s",
                }}
              >
                <Flex gap={"1rem"}>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => finishItem(task.id)}
                  ></Checkbox>

                  <Text
                    as={task.isFinish ? "s" : "p"}
                    fontSize="md"
                    opacity={task.isFinish ? "0.7" : "1"}
                    fontWeight="semibold"
                  >
                    {task.title} {`${task.isFinish}`}
                  </Text>
                </Flex>
                <Menu>
                  <MenuButton>
                    <SettingsIcon />
                  </MenuButton>
                  <MenuList color={"#000"}>
                    <MenuItem>
                      <EditTask task={task} saveTask={editTask} />
                    </MenuItem>
                    <MenuItem onClick={() => removeItem(task.id)}>
                      Remove
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          );
        })}
        <AddTask saveTask={addTask} />
      </Flex>
    </Layout>
  );
}
