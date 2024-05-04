import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import {
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useStore from "../stores/use-store";
import AddTask from "./AddTask";
import Pomodoro from "./Pomodoro";
import WorkingTask from "./WorkingTask";

export default function TodoList() {
  const { workingTasks, setWorkingTasks, addTask, doneAllTasks, selectedTask } =
    useStore();
  console.log(workingTasks, "_workingTasks");
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!active || !over) {
      return;
    } else {
      const oldIndex = workingTasks.findIndex((item) => item.id === active.id);
      const newIndex = workingTasks.findIndex((item) => item.id === over.id);
      const sortTasks = arrayMove(workingTasks, oldIndex, newIndex);
      setWorkingTasks(sortTasks);
    }
  }
  return (
    <Box>
      {workingTasks.length > 0 && selectedTask && (
        <Pomodoro selectedTask={selectedTask} />
      )}
      <Flex align={"center"} flexDirection={"column"} gap="0.5rem">
        {/* <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={workingTasks}
            strategy={verticalListSortingStrategy}
          > */}
        {workingTasks.map((task) => (
          // <SortableItem key={task.id} task={task}>
          <WorkingTask task={task} key={task.id} />
          // </SortableItem>
        ))}
        {/* </SortableContext>
        </DndContext> */}

        <HStack mt="1rem" justify={"space-between"} w={"100%"}>
          <AddTask saveTask={(task) => addTask(task)} />
          {workingTasks.length > 0 && (
            <Button
              variant="outline"
              colorScheme="black"
              borderColor={"black"}
              w={"50%"}
              onClick={() => doneAllTasks()}
              // width={[300, 400]}
              h={"56px"}
              borderRadius={"6px"}
            >
              Done all
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
