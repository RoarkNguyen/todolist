import { Box, Button, Flex, HStack, Stat, StatNumber } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useStore from "../stores/use-store";
import { TaskType } from "../types";
import { getHoursMinutesSeconds } from "../utils/timer";

export default function Pomodoro({ selectedTask }: { selectedTask: TaskType }) {
  const { finishTaskWhenTimeEnd, setTimeSelectedTask } = useStore();
  const [isToggleStart, setToggleStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTask.seconds ?? 0);
  const [time, setTime] = useState(getHoursMinutesSeconds(timeLeft));

  useEffect(() => {
    // exit early when we reach 0
    if (isToggleStart && timeLeft === 0) {
      setToggleStart(false);
      finishTaskWhenTimeEnd();
      alert("End Time!");
      return;
    }

    if (isToggleStart) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        setTimeSelectedTask(selectedTask, timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isToggleStart]);

  useEffect(() => {
    setTime(getHoursMinutesSeconds(selectedTask.seconds ?? 0));
    setTimeLeft(selectedTask.seconds);
  }, [selectedTask]);

  if (!selectedTask) return null;

  return (
    <Box mb={"2rem"}>
      <Flex gap="1rem" align={"center"} w={"100%"} flexDir={"column"}>
        {/* <Text>{selectedTask.title}</Text> */}
        <Stat>
          <Flex>
            <StatNumber fontSize="4rem">{time.hours}:</StatNumber>
            <StatNumber fontSize="4rem">{time.minutes}:</StatNumber>
            <StatNumber fontSize="4rem">{time.seconds}</StatNumber>
          </Flex>
        </Stat>
        <HStack>
          <Button
            bg={isToggleStart ? "#d54747" : "#3469cd"}
            color="#fff"
            width={[300, 400]}
            _hover={{
              opacity: "0.7",
            }}
            h="3rem"
            onClick={() => {
              selectedTask.seconds > 0 && setToggleStart(!isToggleStart);
            }}
          >
            {!isToggleStart ? "Start" : "Pause"}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
