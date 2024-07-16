import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './index.css'
const theme = extendTheme({
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
    // Add more specific fonts if needed
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
