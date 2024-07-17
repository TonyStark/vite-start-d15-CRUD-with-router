import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function PrivateRoute({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
    setIsLoading(false);
    // setTimeout(() => {
    // }, 3000);
  }, []);

  if (isLoading) {
    return (
      <Center minH={"100vh"}>
        <CircularProgress isIndeterminate size="100px" color="blue.500" />
      </Center>
    );
  }

  if (loggedIn) {
    console.log("Logged in:", loggedIn);
    return <Outlet />;
  } else {
    console.log("Logged in:", loggedIn);
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
