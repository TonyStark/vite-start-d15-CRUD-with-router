import React from "react";
import Logo from "../assets/139807.png";
import { Box, Link, Flex, Divider, Text, Heading, IconButton, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaBolt, FaTshirt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BellIcon } from "@chakra-ui/icons";
import { MdExplore, MdAddBox, MdLogin, MdLogout } from "react-icons/md";

// #5B00FF
function NavBar(props) {
  const { onToggle } = props;
  return (
    <Flex as="nav" padding="20px" justify={{ base: "space-between", lg: "flex-end" }} bg="white" alignItems="center">
      <HStack display={{ base: "flex", lg: "none" }}>
        <IconButton icon={<FiMenu />} onClick={onToggle} />
        <Heading>Dashboard</Heading>
      </HStack>
      <Flex alignItems="center" gap="10px">
        <IconButton icon={<BellIcon boxSize="20px" />} />
        <HStack alignItems="center" gap="7px">
          <Box bg="gray.200" p="7px">
            RL
          </Box>
          <Text as="span">Rutul</Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default NavBar;
