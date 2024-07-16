import { Box, Heading, Container, SimpleGrid } from "@chakra-ui/react";
function Item() {
  return (
    <Box>
      {/* <SimpleGrid columns="4" minChildWidth="250px" spacing="10" p="20px">
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>

        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>

        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
      </SimpleGrid> */}

      <SimpleGrid columns="3" minChildWidth="250px" spacing="10" p="20px">
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
        <Box bg="green" h="200px" border="1px"></Box>
      </SimpleGrid>
    </Box>
  );
}

export default Item;
