import { createContext, useEffect, useState } from "react";
import { getAllSoccerGames } from "../services/soccer";

export const soccerContext = createContext({
  fetching: Boolean,
  games: Array,
});

export function SoccerProvider({ children }) {
  const [fetching, setFetching] = useState(true);
  const [games, setGames] = useState([]);

  async function importSoccerGames() {
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
        fetching,
        games,
      }}
    >
      {children}
    </soccerContext.Provider>
  );
}
