import { createContext, useContext, useEffect, useState } from "react";
import { getAllSoccerGames } from "../services/soccer";
import { socketContext } from "./SocketContext";

export const soccerContext = createContext({
  fetching: Boolean,
  games: Array,
});

export function SoccerProvider({ children }) {
  const { Listen } = useContext(socketContext);

  const [fetching, setFetching] = useState(true);
  const [games, setGames] = useState([]);

  function removeGame(game) {
    setGames([...games.filter((g) => g.id !== game.id)]);
  }

  async function insertNewGame(game) {
    game.date = new Date(game.date);
    setGames([...games, game]);
  }

  async function updateEntry(data) {
    const index = games.map((g) => g.id).indexOf(data.id);
    if (!index) return;

    const newGames = [...games];
    const entryIndex = games[index].entries
      .map((e) => e.id)
      .indexOf(data.entry.id);

    if (entryIndex !== -1) {
      newGames[index].entries[entryIndex] = data.entry;
    } else {
      newGames[index].entries.push(data.entry);
    }

    setGames(newGames);
  }

  async function updateGame(game) {
    game.date = new Date(game.date);
    const index = games.map((g) => g.id).indexOf(game.id);
    if (!index) return;

    const newGames = [...games];

    for (const key in game) {
      newGames[index][key] = game[key];
    }

    setGames(newGames);
  }

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

  useEffect(() => {
    Listen("insert-game", insertNewGame);

    if (games.length === 0) return;

    Listen("update-game", updateGame);
    Listen("update-entry", updateEntry);
    Listen("delete-game", removeGame);
  }, [games]);

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
