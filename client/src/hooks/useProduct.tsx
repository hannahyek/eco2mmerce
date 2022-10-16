import React from "react";
import { createContext, useContext, useState } from "react";

type Product = {
  title: string;
  price: string;
  image: string;
  link: string;
};

type ProductContextType =
  | [Product, React.Dispatch<React.SetStateAction<Product>>]
  | undefined;

const productContext = createContext<ProductContextType>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useState<Product>({
    title: "",
    price: "",
    image: "",
    link: "",
  });

  return (
    <productContext.Provider value={context}>
      {children}
    </productContext.Provider>
  );
};

export const useProduct = () => {
  const product = useContext(productContext);

  if (!product) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return product;
};

export default useProduct;
