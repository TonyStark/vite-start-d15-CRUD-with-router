import { useState, useEffect } from "react";
import { Card, Text, CardBody, Heading, CardHeader, SimpleGrid, Flex } from "@chakra-ui/react";
import { FiUsers, FiBox } from "react-icons/fi";
import axios from "axios";
function Item() {
  const [userCount, setUserCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUser = await axios.get("http://localhost:3000/users");
        const responseProducts = await axios.get("http://localhost:3000/products");
        const users = responseUser.data;
        const products = responseProducts.data;
        setUserCount(users.length);
        setProductsCount(products.length);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10" p="20px">
      <Card>
        <CardHeader>
          <Flex align="center">
            <FiUsers size={40} style={{ marginRight: "10px" }} />
            <Heading size="lg" fontWeight={"500"}>
              Users
            </Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="50">{userCount}</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Flex align="center">
            <FiBox size={40} style={{ marginRight: "10px" }} />
            <Heading size="lg" fontWeight={"500"}>
              Products
            </Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="50">{productsCount}</Text>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default Item;
