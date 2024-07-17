import { Box, Heading, Center, FormControl, FormLabel, Input, Button, Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      const resp = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
      if (resp.data.length > 0) {
        console.log("Login successfully:", resp.data);
        setEmail("");
        setPassword("");
        setError("");
        localStorage.setItem("loggedIn", JSON.stringify(true));
        navigate("/dashboard");
      } else {
        setError("Invalid Email or Password");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <Center h="100vh">
      <Container maxW="md">
        <Heading as="h1" textAlign="center" mb={6}>
          Login
        </Heading>
        <FormControl>
          <FormLabel mb={2}>Email address</FormLabel>
          <Input type="email" mb={3} value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormLabel mb={2}>Password</FormLabel>
          <Input type="password" mb={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && (
            <Box mb={6} color="red.500">
              {error}
            </Box>
          )}
          <Stack spacing={3}>
            <Button colorScheme="teal" variant="solid" onClick={handleLogin} width="full">
              Login
            </Button>
            <Button as={Link} to="/signup" variant="link" color="teal.500">
              Signup
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </Center>
  );
}

export default Login;
