import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./utils";
import { IndexPage } from "./views";
import { ModalProvider, CarbonProvider, ProductProvider } from "./hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ProductProvider>
        <CarbonProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </CarbonProvider>
      </ProductProvider>
    </ChakraProvider>
  );
};

export default App;
