"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import useStore from "../stores/use-store";

interface Props {
  children: React.ReactNode;
  keyTab: string;
}
const Links = [
  { name: "Todolist", href: "/", keyTab: "working" },
  { name: "Done Tasks", href: "/done-tasks", keyTab: "done" },
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
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
