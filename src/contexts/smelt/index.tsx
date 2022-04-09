import React from "react";

import { ISmeltContext, ISmeltContextProvider } from "./ISmeltContext";

export const SmeltContext = React.createContext<ISmeltContext>({
  mutationMode: "pessimistic",
  warnWhenUnsavedChanges: false,
  syncWithLocation: false,
  undoableTimeout: 5000,
});

export const SmeltContextProvider: React.FC<ISmeltContextProvider> = ({
  mutationMode,
  warnWhenUnsavedChanges,
  syncWithLocation,
  undoableTimeout,
  children,
}) => {
  return (
    <SmeltContext.Provider
      value={{
        mutationMode,
        warnWhenUnsavedChanges,
        syncWithLocation,
        undoableTimeout,
      }}
    >
      {children}
    </SmeltContext.Provider>
  );
};
