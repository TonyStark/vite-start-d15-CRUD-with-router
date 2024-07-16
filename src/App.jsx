// import "./App.css";
import { Box, Flex, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Layout from "./Components/Layout";
import Item from "./Components/Item";
import SideNav from "./Components/SideNav";
import NavBar from "./Components/NavBar";
import Products from "./Components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Grid templateColumns="repeat(6,1fr)" bg={"gray.50"}>
      <GridItem as="aside" minH="100vh" bg="white" p="20px" colSpan={{ base: "6", lg: "2", xl: "1" }} position={{ base: "absolute", lg: "static" }} zIndex={"99"} left={{ base: isOpen ? "0" : "-100%", lg: "auto" }} transition="0.5s" w={{ base: "250px", lg: "auto" }}>
        <SideNav onClose={onClose} />
      </GridItem>
      <GridItem as="main" colSpan={{ base: "6", lg: "4", xl: "5" }} bg={"gray.100"}>
        <NavBar onToggle={onToggle} />
        <Routes>
          <Route path="/" element={<Item />} />
          <Route path="/products" element={<Products />} />
          <Route path="/logout" element={<Products />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
