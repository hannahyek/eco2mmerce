import React from "react";
import { Center, Link, Text } from "@chakra-ui/react";

import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Center as="footer" py="4" borderTop="solid 1px #e2e8f0">
        <Text>
          Made with 🧋 for {""}
          <Link href="https://sachacks.io/" isExternal color="primary.500">
            SacHacks 2022
          </Link>
        </Text>
      </Center>
    </>
  );
};

export default Layout;
