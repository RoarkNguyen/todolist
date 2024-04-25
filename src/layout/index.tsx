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
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  href: string;
}
const Links = [
  { name: "Todolist", href: "/" },
  { name: "Done Tasks", href: "/done-tasks" },
];

const NavLink = (props: Props) => {
  const { children, href } = props;
  // const router = useRoutes()
  const location = useLocation();
  return (
    <Box
      as="a"
      fontWeight={"bold"}
      px={2}
      py={1}
      rounded={"md"}
      color={location.pathname === href ? "#d54747" : "#000"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
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
                <NavLink href={link.href} key={link.name}>
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
