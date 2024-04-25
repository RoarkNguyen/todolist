import {
  Button,
  Flex,
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
      title: data.title,
      time: data.time ? data.time : 25,
    };
    saveTask(newTask);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justify={"center"}>
      <Button
        onClick={() => {
          onOpen();
          reset();
        }}
        width={[300, 400]}
        mt={"0.5rem"}
        h={"56px"}
        borderRadius={"6px"}
      >
        Add task
      </Button>

      <Modal size={["xs", "md"]} isOpen={isOpen} onClose={onClose}>
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
                <FormLabel htmlFor="time">{`Estimated time (optional)`}</FormLabel>
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
    </Flex>
  );
}
