"use client";

import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import useStore from "../stores/use-store";

interface Props {
  children: React.ReactNode;
  keyTab: string;
}
const Links = [
  { name: "Tasks", href: "/", keyTab: "tasks" },
  { name: "Completed", href: "/completed", keyTab: "done" },
];

const NavLink = (props: Props) => {
  const { children, keyTab } = props;
  const { tabSelected, setTabSelected } = useStore();
  return (
    <Box
      fontWeight={"bold"}
      px={2}
      py={1}
      rounded={"md"}
      cursor={"pointer"}
      color={tabSelected === keyTab ? "#d54747" : "#000"}
      _hover={{
        opacity: "0.7",
        transition: "0.25s",
      }}
      onClick={() => setTabSelected(keyTab)}
      fontSize={"lg"}
    >
      {children}
    </Box>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink keyTab={link.keyTab} key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <Box my={"2rem"} display={"flex"} justifyContent={"center"}>
        {children}
      </Box>
    </>
  );
}
