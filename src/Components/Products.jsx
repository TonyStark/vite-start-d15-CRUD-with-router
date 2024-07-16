import { Box, Heading, Container, SimpleGrid } from "@chakra-ui/react";
function Products() {
  return (
    <Box>
      <Box></Box>
      <SimpleGrid columns="4" minChildWidth="250px" spacing="10" p="20px">
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>

        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>

        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
        <Box bg="red" h="200px" border="1px"></Box>
      </SimpleGrid>
    </Box>
  );
}

export default Products;
