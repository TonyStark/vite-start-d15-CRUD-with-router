import { Box, Heading, Center, FormControl, FormLabel, Input, Button, Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setrPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async () => {
    try {
      if (!email || !password || !rpassword) {
        setError("Please fill in all fields.");
        return;
      }
      if (password != rpassword) {
        setError("Passwords are not matching");
        return;
      }
      const newUser = { id: uuidv4(), email, password };
      const resp = await axios.post("http://localhost:3000/users", newUser);
      console.log("User signed up successfully:", resp.data);
      setEmail("");
      setPassword("");
      setrPassword("");
      setError("");
      Swal.fire({
        title: "Sign Up Successful",
        text: "You can now login",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      setError("Signup failed. Please try again.");
    }
  };
  return (
    <Center h="100vh">
      <Container maxW="md">
        <Heading as="h1" textAlign="center" mb={6}>
          Signup
        </Heading>
        <FormControl>
          <FormLabel mb={2}>Email address</FormLabel>
          <Input type="email" mb={3} value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormLabel mb={2}>Password</FormLabel>
          <Input type="password" mb={3} value={password} onChange={(e) => setPassword(e.target.value)} />
          <FormLabel mb={2}>Repeat Password</FormLabel>
          <Input type="password" mb={6} value={rpassword} onChange={(e) => setrPassword(e.target.value)} />
          {error && (
            <Box mb={6} color="red.500">
              {error}
            </Box>
          )}
          <Stack spacing={3}>
            <Button colorScheme="teal" variant="solid" onClick={handleSignup} width="full">
              Signup
            </Button>
            <Button as={Link} to="/login" variant="link" color="teal.500">
              Login
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </Center>
  );
}

export default Signup;
