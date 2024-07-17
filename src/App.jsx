// import "./App.css";
import { Box, Flex, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Layout from "./Components/Layout";
import Item from "./Components/Item";
import SideNav from "./Components/SideNav";
import NavBar from "./Components/NavBar";
import Products from "./Components/Products";
import Index from "./Components/Index";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Signup from "./Components/Signup";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "./Components/AddProduct";

import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

function DashboardLayout() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const location = useLocation();
  return (
    <Grid templateColumns="repeat(6,1fr)" bg={"gray.50"}>
      <GridItem as="aside" minH="100vh" bg="white" p="20px" colSpan={{ base: "6", lg: "2", xl: "1" }} position={{ base: "absolute", lg: "static" }} zIndex={"99"} left={{ base: isOpen ? "0" : "-100%", lg: "auto" }} transition="0.5s" w={{ base: "250px", lg: "auto" }}>
        <SideNav onClose={onClose} />
      </GridItem>
      <GridItem as="main" colSpan={{ base: "6", lg: "4", xl: "5" }} bg={"gray.100"}>
        <NavBar onToggle={onToggle} />
        {location.pathname === "/dashboard" || location.pathname === "/" ? <Item /> : location.pathname === "/products" ? <Products /> : location.pathname === "/add" ? <AddProduct /> : null}
      </GridItem>
    </Grid>
  );
}
function App() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/products" element={<DashboardLayout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/add" element={<DashboardLayout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
