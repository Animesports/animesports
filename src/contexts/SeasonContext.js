import { createContext, useState, useEffect, useContext } from "react";
import { seasonRequest } from "../services/season";
import { socketContext } from "./SocketContext";

export const seasonContext = createContext({});

export function SeasonProvider({ children }) {
  const { Listen } = useContext(socketContext);
  const [fetched, setFetched] = useState(false);
  const [season, setSeason] = useState({});

  async function loadSeason() {
    await seasonRequest().then((season) => {
      setSeason(season);
    });
    setFetched(true);
  }

  function updateSeason(data) {
    const newSeason = { ...season };

    for (const key in data) {
      newSeason[key] = data[key];
    }

    setSeason(newSeason);
  }

  useEffect(loadSeason, []);

  useEffect(() => {
    if (!season.id) return;

    Listen("update-season", updateSeason);
  }, [season]);

  return (
    <seasonContext.Provider
      value={{
        fetched,
        season,
      }}
    >
      {children}
    </seasonContext.Provider>
  );
}
