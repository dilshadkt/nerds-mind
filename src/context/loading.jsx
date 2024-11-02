import { useState } from "react";
import { createContext } from "react";
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const value = {
    isLoading,
    setLoading,
    successRegister,
    setSuccessRegister,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
