import React from "react";
import {
  Container,
  SimpleGrid,
  Heading,
  Button,
  Circle,
  Icon,
  Box,
  Image,
} from "@chakra-ui/react";
import { RiPlantFill } from "react-icons/ri";

import { Layout } from "../components/Layout";
import { Graphic } from "../assets";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxW="container.lg" my="auto" minH="30rem" display="flex">
        <SimpleGrid columns={2} spacing={10} alignContent="center" my="auto">
          <Box my="auto">
            <Heading maxW="lg">
              Want to find out more about your carbon footprint?
            </Heading>
            <Button mt={8} onClick={() => navigate("/calculator")}>
              Go to Calculator
            </Button>
          </Box>
          <Image src={Graphic} alt="graphic" />
        </SimpleGrid>
      </Container>
      <Container maxW="container.lg" mb={8}>
        <SimpleGrid columns={3} spacing={10} alignContent="center" my="auto">
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={RiPlantFill} color="primary.500" />
            </Circle>
            Want to find out more about your carbon footprint?
          </Box>
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={RiPlantFill} color="primary.500" />
            </Circle>
            Want to find out more about your carbon footprint?
          </Box>
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={RiPlantFill} color="primary.500" />
            </Circle>
            Want to find out more about your carbon footprint?
          </Box>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default IndexPage;
