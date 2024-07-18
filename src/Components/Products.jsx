import { Flex, Select, Image, FormControl, Box, Input, Textarea, VStack, FormLabel, Text, Heading, CardFooter, SimpleGrid, Card, CardBody, Divider, Stack, Button, Modal, IconButton, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiArrowRightCircle, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (selectedProductEdit) {
      setProductName(selectedProductEdit.productName);
      setProductDescription(selectedProductEdit.productDescription);
      setProductPrice(selectedProductEdit.productPrice);
      setProductImageUrl(selectedProductEdit.productImageUrl);
    }
  }, [selectedProductEdit]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [location]);
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };
  const handleEditDetails = (product) => {
    setSelectedProductEdit(product);
    setShowModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setSelectedProductEdit(null);
    setShowModalEdit(false);
  };
  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        ...selectedProductEdit,
        productName,
        productDescription,
        productPrice,
        productImageUrl,
      };

      const response = await axios.put(`http://localhost:3000/products/${selectedProductEdit.id}`, updatedProduct);
      console.log("Updated product:", response.data);
      fetchProducts();
      handleCloseModalEdit();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      const updatedProducts = products.filter((product) => {
        return product.id !== productId;
      });
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      console.log("Product deleted successfully");
      Swal.fire({
        title: "Product Deleted Successful",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };
  const sortProducts = (criteria) => {
    let sortedProducts = [...filteredProducts];

    switch (criteria) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        fetchProducts();
        break;
    }

    setFilteredProducts(sortedProducts);
    setSortBy(criteria);
  };
  const handleSearch = () => {
    const searchResults = products.filter((product) => {
      const productNameMatches = product.productName.toLowerCase().includes(query.toLowerCase());
      const productDescriptionMatches = product.productDescription.toLowerCase().includes(query.toLowerCase());
      return productNameMatches || productDescriptionMatches;
    });

    setFilteredProducts(searchResults);
  };

  return (
    <>
      {filteredProducts.length > 0 ? (
        <Flex p="20px" justifyContent={"space-between"} w="full">
          <Flex w="md" gap={4}>
            <Input placeholder="Search..." bg="white" value={query} onChange={(e) => setQuery(e.target.value)} />
            <IconButton icon={<FiSearch />} colorScheme="teal" onClick={handleSearch} aria-label="Search" />
          </Flex>
          <Select value={sortBy} w="base" bg="white" onChange={(e) => sortProducts(e.target.value)}>
            <option value="default">Default Sorting</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Select>
        </Flex>
      ) : (
        <Flex p="20px" justifyContent={"space-between"} w="full">
          <Flex w="md" gap={4}>
            <Input placeholder="Search..." bg="white" value={query} onChange={(e) => setQuery(e.target.value)} />
            <IconButton icon={<FiSearch />} colorScheme="teal" onClick={handleSearch} aria-label="Search" />
          </Flex>
        </Flex>
      )}
      {filteredProducts.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 3 }} spacing="10" p="20px">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardBody>
                <Image src={product.productImageUrl} borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.productName}</Heading>
                  <Text noOfLines="3">{product.productDescription}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    ₹{product.productPrice}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup variant="solid" spacing="2" alignItems={"center"} justifyContent={"space-between"} w="full">
                  <Button colorScheme="green" rightIcon={<FiArrowRightCircle />} onClick={() => handleViewDetails(product)}>
                    View
                  </Button>
                  <ButtonGroup isAttached variant="solid">
                    <IconButton
                      colorScheme="orange"
                      icon={<FiEdit2 />}
                      onClick={() => {
                        handleEditDetails(product);
                      }}
                    />
                    <IconButton colorScheme="purple" icon={<FiTrash2 />} onClick={() => handleDeleteProduct(product.id)} />
                  </ButtonGroup>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}

          <Modal isOpen={showModal} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedProduct?.productName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image w="full" src={selectedProduct?.productImageUrl} borderRadius="lg" />
                <Text mt="4">{selectedProduct?.productDescription}</Text>
                <Text mt="2" color="blue.600" fontSize="2xl">
                  ₹{selectedProduct?.productPrice}
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={handleCloseModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={showModalEdit} onClose={handleCloseModalEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit - {selectedProductEdit?.productName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
                    <Button colorScheme="teal" variant="solid" width="full" onClick={handleSaveChanges}>
                      Edit Product
                    </Button>
                  </Stack>
                </FormControl>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1 }} spacing="10" p="20px">
          <Heading>No Products</Heading>
        </SimpleGrid>
      )}
    </>
  );
}

export default Products;
