import { useState } from "react";
import { FormControl, FormLabel, Input, Stack, Card, Text, CardBody, Heading, Button, Box, Textarea, Container } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import axios from "axios";
function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      if (!productName || !productDescription || !productPrice || !productImageUrl) {
        setError("Please fill in all fields.");
        return;
      }
      setIsLoading(true);
      const newProduct = {
        id: uuidv4(),
        productName,
        productDescription,
        productPrice,
        productImageUrl,
      };
      const resp = await axios.post("http://localhost:3000/products", newProduct);
      console.log("Product added successfully:", resp.data);
      Swal.fire({
        title: "Product Added Successful",
        icon: "success",
      });
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductImageUrl("");
      setError("");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container p="20px">
      <Card>
        <CardBody>
          <Heading as="h1" textAlign="center" mb={6}>
            Add Product
          </Heading>
          <FormControl>
            <FormLabel mb={2}>Product Name</FormLabel>
            <Input type="text" mb={3} value={productName} onChange={(e) => setProductName(e.target.value)} />
            <FormLabel mb={2}>Product Description</FormLabel>
            <Textarea placeholder="" mb={3} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            <FormLabel mb={2}>Product Price (₹)</FormLabel>
            <Input type="text" mb={3} value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <FormLabel mb={2}>Product Image URL</FormLabel>
            <Input type="text" mb={6} value={productImageUrl} onChange={(e) => setProductImageUrl(e.target.value)} />
            {error && (
              <Box mb={6} color="red.500">
                {error}
              </Box>
            )}
            <Stack>
              <Button colorScheme="teal" variant="solid" width="full" onClick={handleSubmit} isLoading={isLoading}>
                Add Product
              </Button>
            </Stack>
          </FormControl>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AddProduct;
