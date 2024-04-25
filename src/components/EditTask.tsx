import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskType } from "../types";

type InputsEditTask = {
  title: string;
  time: number;
};

export default function EditTask({
  saveTask,
  task,
}: {
  saveTask: (task: TaskType) => void;
  task: TaskType;
}) {
  const { register, handleSubmit } = useForm<InputsEditTask>();
  const onSubmit: SubmitHandler<InputsEditTask> = (data) => {
    const editTask = {
      ...task,
      ...data,
    };
    saveTask(editTask);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen}>Edit</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormLabel htmlFor="title">Your task</FormLabel>
                <Input
                  defaultValue={task.title}
                  {...register("title", { required: true })}
                  variant="outline"
                  placeholder="Breathe the clean air"
                />
                <FormLabel htmlFor="time">Estimated time</FormLabel>
                <Input
                  defaultValue={task.time}
                  type="number"
                  {...register("time")}
                  variant="outline"
                  placeholder="25"
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button colorScheme="blue" type="submit" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
