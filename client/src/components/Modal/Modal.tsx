import {
  Button,
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Image,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { useCarbon, useModal, useProduct } from "../../hooks";
import { PieChart } from "../Chart";

const ModalStat = ({ label, value }: { label: string; value: number }) => {
  return (
    <Stat outline="1px solid" outlineColor="gray.200" p={4}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>
        <CountUp end={value} /> lbs
      </StatNumber>
    </Stat>
  );
};

const Modal = () => {
  const { isOpen, onClose } = useModal();
  const [carbon] = useCarbon();
  const [product] = useProduct();

  return (
    <CModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="container.lg" minH="30rem">
        <ModalHeader>eco₂mmerce score</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={2} spacing={8}>
            <Box>
              <Image src={product.image} />
              <Link href={product.link} isExternal>
                <Text color="primary.500" mt={2}>
                  {product.title}
                </Text>
              </Link>
              <Text>{product.price}</Text>
            </Box>
            <Box>
              <PieChart
                data={[
                  {
                    id: "flight_emissions",
                    label: "Flight emissions",
                    value: carbon?.flight_emissions,
                    color: "hsl(23, 70%, 50%)",
                  },
                  {
                    id: "truck_emissions",
                    label: "Truck emissions",
                    value: carbon?.truck_emissions,
                    color: "hsl(178, 70%, 50%)",
                  },
                ]}
              />
              <SimpleGrid columns={[1, null, 3]} spacing={4}>
                <ModalStat
                  label="Estimated Flight CO₂ emissions"
                  value={carbon?.flight_emissions ?? 0}
                />
                <ModalStat
                  label="Estimated Truck CO₂ emissions"
                  value={carbon?.truck_emissions ?? 0}
                />
                <ModalStat
                  label="Estimated Total CO₂ emissions"
                  value={carbon?.total_emissions ?? 0}
                />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </CModal>
  );
};

export default Modal;
