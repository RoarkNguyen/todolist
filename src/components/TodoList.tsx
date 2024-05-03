import { Box, Flex } from "@chakra-ui/react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useStore from "../stores/use-store";
import AddTask from "./AddTask";
import { SortableItem } from "./SortTableItem";
import WorkingTask from "./WorkingTask";
export default function TodoList() {
  const { workingTasks, setWorkingTasks, addTask, selectedTask } = useStore();

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

  console.log(workingTasks, "_workingTasks");
  return (
    <Box>
      {/* {selectTask && <Pomodoro task={selectTask} />} */}
      <Flex align={"center"} flexDirection={"column"} gap="0.5rem">
        {selectedTask && workingTasks.length > 0 && (
          <Box textAlign={"center"}>{selectedTask.title}</Box>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={workingTasks}
            strategy={verticalListSortingStrategy}
          >
            {workingTasks.map((task) => (
              <SortableItem key={task.id} task={task}>
                <WorkingTask task={task} />
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        <AddTask saveTask={(task) => addTask(task)} />
      </Flex>
    </Box>
  );
}
