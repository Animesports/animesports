import { createContext, useEffect, useState } from "react";
import { updateGameScore } from "../services/admin";
import { getAllSoccerGames } from "../services/soccer";

export const soccerContext = createContext({
  fetching: Boolean,
  games: Array,
  updateGame: Function,
  insertNewGame: Function,
  removeGame: Function,
});

export function SoccerProvider({ children }) {
  const [fetching, setFetching] = useState(true);
  const [games, setGames] = useState([]);

  function removeGame(game) {
    console.info(
      games,
      game,
      games.filter((g) => g.id === game.id)
    );

    const newGames = games.filter((g) => g.id !== game.id);

    setGames(newGames);
  }

  async function insertNewGame(game) {
    game.date = new Date(game.date);
    games.push(game);

    setGames(games);
  }

  async function updateGame(game) {
    const index = games
      .map((g, i) => {
        return { g, i };
      })
      .filter(({ g }) => g.id === game.id)[0]?.i;
    if (index) return;
    for (const key in game) {
      games[index][key] = game[key];
    }
    setGames(games);
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

  return (
    <soccerContext.Provider
      value={{
        fetching,
        games,
        updateGame,
        insertNewGame,
        removeGame,
      }}
    >
      {children}
    </soccerContext.Provider>
  );
}
