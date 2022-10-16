import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

type ModalContextType = ReturnType<typeof useDisclosure> | undefined;

const modalContext = createContext<ModalContextType>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useDisclosure();

  return (
    <modalContext.Provider value={modal}>{children}</modalContext.Provider>
  );
};

export const useModal = () => {
  const modal = useContext(modalContext);

  if (!modal) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return modal;
};
