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
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskType } from "../types";
import { generateUUID } from "../utils/uuid";

type InputsAddTak = {
  title: string;
  time: number;
};

export default function AddTask({
  saveTask,
}: {
  saveTask: (task: TaskType) => void;
}) {
  const { register, handleSubmit, reset } = useForm<InputsAddTak>();

  const onSubmit: SubmitHandler<InputsAddTak> = (data) => {
    const id = generateUUID();
    const newTask = {
      id,
      isRemoved: false,
      isFinish: false,
      ...data,
    };
    saveTask(newTask);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          reset();
        }}
      >
        Add task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>What are you working on?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormLabel htmlFor="title">Your task</FormLabel>
                <Input
                  {...register("title", { required: true })}
                  variant="outline"
                  placeholder="Breathe the clean air"
                />
                <FormLabel htmlFor="time">Estimated time</FormLabel>
                <Input
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
