import React from "react";
import Logo from "../assets/139807.png";
import { NavLink } from "react-router-dom";
import { List, ListItem, Divider, VStack, HStack, IconButton, Heading } from "@chakra-ui/react";
import { FiLogOut, FiX, FiBox, FiHome, FiPlusSquare } from "react-icons/fi";

// #5B00FF
function SideNav(props) {
  const { onClose } = props;
  return (
    <VStack w="full" align={"flex-start"} spacing={"7"}>
      <HStack justify={"space-between"}>
        <Heading>Dashboard</Heading>
        <IconButton display={{ base: "flex", lg: "none" }} rounded={"full"} icon={<FiX />} onClick={onClose} />
      </HStack>
      <List spacing={3} w={"full"}>
        <ListItem _hover={{ backgroundColor: "orange", borderRadius: "5px", transition: "0.3s" }}>
          <NavLink to="/" style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}>
            <FiHome style={{ marginRight: "8px" }} />
            Dashboard
          </NavLink>
        </ListItem>
        <ListItem _hover={{ backgroundColor: "orange", borderRadius: "5px" }}>
          <NavLink to="/products" style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}>
            <FiBox style={{ marginRight: "8px" }} />
            Products
          </NavLink>
        </ListItem>
        <ListItem _hover={{ backgroundColor: "orange", borderRadius: "5px", transition: "0.3s" }}>
          <NavLink to="/logout" style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}>
            <FiLogOut style={{ marginRight: "8px" }} />
            Logout
          </NavLink>
        </ListItem>

        <Divider />
        <ListItem _hover={{ backgroundColor: "orange", borderRadius: "5px", transition: "0.3s" }}>
          <NavLink to="/" style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}>
            <FiPlusSquare style={{ marginRight: "8px" }} />
            Add Product
          </NavLink>
        </ListItem>
      </List>
    </VStack>
  );
}

export default SideNav;
