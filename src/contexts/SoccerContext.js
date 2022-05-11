import { createContext, useEffect, useState } from "react";
import { getAllSoccerGames } from "../services/soccer";

export const soccerContext = createContext({
  fetching: Boolean,
  games: Array,
});

export function SoccerProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(true); // TODO: Isso não deve ficar aqui

  const [fetching, setFetching] = useState(false);
  const [games, setGames] = useState([]);

  function changeModalState() {
    setModalVisible(!modalVisible);
  }

  async function importSoccerGames() {
    setFetching(true);
    await getAllSoccerGames().then((games) => {
      setGames(
        games.map((game) => {
          game.date = new Date(game.date);
          return game;
        })
      );
    });
    setFetching(false);
  }

  useEffect(() => {
    importSoccerGames();
  }, []);

  return (
    <soccerContext.Provider
      value={{
        changeModalState,
        modalVisible,

        fetching,
        games,
      }}
    >
      {children}
    </soccerContext.Provider>
  );
}
