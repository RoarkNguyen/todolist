import { Box } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskType } from "../types";
import { generateUUID } from "../utils/uuid";

type InputsAddTak = {
  title: string;
  time: number;
};

export default function Pomodoro({ task }: { task: TaskType }) {
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
    // saveTask(newTask);
  };
  return (
    <>
      <Box>
        {task.title}
        {task.time}
      </Box>
    </>
  );
}
