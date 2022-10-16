import React from "react";
import { createContext, useContext, useState } from "react";

type Carbon = {
  flight_emissions: number;
  total_emissions: number;
  truck_emissions: number;
};

type CarbonContextType =
  | [Carbon, React.Dispatch<React.SetStateAction<Carbon>>]
  | undefined;

const carbonContext = createContext<CarbonContextType>(undefined);

export const CarbonProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useState<Carbon>({
    flight_emissions: 0,
    total_emissions: 0,
    truck_emissions: 0,
  });

  return (
    <carbonContext.Provider value={context}>{children}</carbonContext.Provider>
  );
};

export const useCarbon = () => {
  const carbon = useContext(carbonContext);

  if (!carbon) {
    throw new Error("useCarbon must be used within a CarbonProvider");
  }

  return carbon;
};

export default useCarbon;
