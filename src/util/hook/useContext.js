import { createContext, useContext, useState, useEffect } from "react";

const SetupContext = createContext();

export const SetupProvider = ({ children }) => {
  const [setupComplete, setSetupComplete] = useState(
    () => JSON.parse(localStorage.getItem("setupComplete")) || false
  );

  useEffect(() => {
    localStorage.setItem("setupComplete", JSON.stringify(setupComplete));
  }, [setupComplete]);

  return (
    <SetupContext.Provider value={{ setupComplete, setSetupComplete }}>
      {children}
    </SetupContext.Provider>
  );
};

export const useSetup = () => useContext(SetupContext);
