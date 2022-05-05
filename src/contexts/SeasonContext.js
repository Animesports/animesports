import { createContext, useState, useEffect } from "react";
import { seasonRequest } from "../services/season";

export const seasonContext = createContext({});

export function SeasonProvider({ children }) {
  const [fetched, setFetched] = useState(false);
  const [season, setSeason] = useState({});

  async function loadSeason() {
    await seasonRequest().then((season) => {
      console.info(season);
      setSeason(season);
    });
    setFetched(true);
  }

  useEffect(loadSeason, []);

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
