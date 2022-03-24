import { createContext } from "react";
import { useState } from "react";

export const soccerContext = createContext({});

export function SoccerContextProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(true);

  function changeModalState() {
    setModalVisible(!modalVisible);
  }

  return (
    <soccerContext.Provider
      value={{
        changeModalState,
        modalVisible,
      }}
    >
      {children}
    </soccerContext.Provider>
  );
}
