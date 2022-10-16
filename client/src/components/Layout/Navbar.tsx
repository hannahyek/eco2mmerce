import { Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex h="5rem" gap={4} align="center" justify="center" boxShadow="md">
      <Image
        src={Logo}
        w="200px"
        onClick={() => navigate("/")}
        cursor="pointer"
        alt="eco2mmerce logo"
      />
    </Flex>
  );
};

export default Navbar;
