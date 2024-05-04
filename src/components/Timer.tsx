"use client";

import { Flex, Stat, StatNumber } from "@chakra-ui/react";
import { getHoursMinutesSeconds } from "../utils/timer";

export default function Timer({ seconds }: { seconds: number }) {
  const timeObject = getHoursMinutesSeconds(seconds);

  return (
    <Stat>
      <Flex>
        <StatNumber>{timeObject.hours}:</StatNumber>
        <StatNumber>{timeObject.minutes}:</StatNumber>
        <StatNumber>{timeObject.seconds}</StatNumber>
      </Flex>
    </Stat>
  );
}
