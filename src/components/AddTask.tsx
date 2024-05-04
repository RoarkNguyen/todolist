import {
  Box,
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
  seconds: number;
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
      seconds: data.seconds ? Number(data.seconds) * 60 : 25 * 60,
      // seconds: data.seconds ? data.seconds * 60 : 25 * 60,
    };
    saveTask(newTask);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box flex="1" w={"300px"}>
      <Button
        w={"100%"}
        variant="solid"
        onClick={() => {
          onOpen();
          reset();
        }}
        // width={[300, 400]}

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
                />
                <FormLabel htmlFor="time">{`Estimated time (optional)`}</FormLabel>
                <Input
                  type="number"
                  {...register("seconds")}
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
    </Box>
  );
}
