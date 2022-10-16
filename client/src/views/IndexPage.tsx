import React from "react";
import {
  Container,
  SimpleGrid,
  Heading,
  Circle,
  Icon,
  Box,
  Image,
} from "@chakra-ui/react";
import { RiPlantLine } from "react-icons/ri";
import { SlChemistry } from "react-icons/sl";
import { MdOutlinePeopleAlt } from "react-icons/md";

import { Layout } from "../components/Layout";
import { Graphic } from "../assets";
import { AmazonInput } from "../components/Form";
import { Modal } from "../components/Modal";

const IndexPage = () => {
  return (
    <Layout>
      <Container maxW="container.lg" my="auto" minH="35rem" display="flex">
        <SimpleGrid
          columns={[1, null, 2]}
          spacing={10}
          alignContent="center"
          my="auto"
        >
          <Box my="auto">
            <Heading maxW="lg" mb={8}>
              Want to find out more about your carbon footprint?
            </Heading>
            <AmazonInput />
          </Box>
          <Image
            src={Graphic}
            alt="graphic"
            display={["none", null, "block"]}
          />
        </SimpleGrid>
      </Container>
      <Container maxW="container.lg" mb={8}>
        <SimpleGrid columns={3} spacing={10} alignContent="center" my="auto">
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={SlChemistry} color="primary.500" />
            </Circle>
            Learn how to reduce your carbon footprint
          </Box>
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={RiPlantLine} color="primary.500" />
            </Circle>
            Take a look at the impact of your purchases
          </Box>
          <Box p="8" border="1px solid" borderColor="gray.200">
            <Circle size="40px" bg="primary.100" mb="4">
              <Icon as={MdOutlinePeopleAlt} color="primary.500" />
            </Circle>
            Find the environmental effects of consumerism
          </Box>
        </SimpleGrid>
      </Container>
      <Modal />
    </Layout>
  );
};

export default IndexPage;
