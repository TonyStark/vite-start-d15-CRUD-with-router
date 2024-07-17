import { Image, Text, Heading, CardFooter, SimpleGrid, Card, CardBody, Divider, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRightCircle } from "react-icons/fi";
function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };
  return (
    <>
      {products.length > 0 ? (
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing="10" p="20px">
          {products.map((product) => (
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
                <Button variant="solid" colorScheme="green" rightIcon={<FiArrowRightCircle />} size="md" onClick={() => handleViewDetails(product)}>
                  View Details
                </Button>
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
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1 }} spacing="10" p="20px">
          <Heading>No Products Added</Heading>
        </SimpleGrid>
      )}
    </>
  );
}

export default Products;
