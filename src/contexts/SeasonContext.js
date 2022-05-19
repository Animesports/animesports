import { createContext, useState, useEffect, useContext } from "react";
import { seasonRequest, seasonUsersRequest } from "../services/season";
import { LimitedUser, Season } from "../utils/Types";
import { socketContext } from "./SocketContext";

export const seasonContext = createContext({
  users: LimitedUser,
  fetched: Boolean,
  season: Season,
});

export function SeasonProvider({ children }) {
  const { Listen } = useContext(socketContext);
  const [fetched, setFetched] = useState(false);
  const [season, setSeason] = useState({});
  const [users, setUsers] = useState([]);

  async function loadSeason() {
    await seasonRequest().then((season) => {
      setSeason(season);
    });
    setFetched(true);
  }

  async function loadSeasonUsers() {
    await seasonUsersRequest().then((users) => {
      console.info("season:", users);
      setUsers(users);
    });
  }

  function updateSeason(data) {
    const newSeason = { ...season };

    for (const key in data) {
      newSeason[key] = data[key];
    }

    setSeason(newSeason);
  }

  useEffect(() => {
    loadSeason();
    loadSeasonUsers();
  }, []);

  useEffect(() => {
    if (!season.id) return;

    Listen("update-season", updateSeason);
  }, [season]);

  return (
    <seasonContext.Provider
      value={{
        fetched,
        season,
        users,
      }}
    >
      {children}
    </seasonContext.Provider>
  );
}
