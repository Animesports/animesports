import { getDisplayDate } from "./Date";
import { firstWord } from "./Global";

export function gameQuery({ ["teams"]: { visited, visitor }, date }, opt) {
  const query = `${firstWord(visited.name, {
    min: 3,
    abb: true,
    max: 6,
  })} vs ${firstWord(visitor.name, {
    min: 3,
    abb: true,
    max: 6,
  })}  ${
    getDisplayDate(date).week
  } ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${visitor.name} ${
    visited.name
  }`.toLowerCase();

  if (opt?.max) {
    return query.split(" ").slice(0, opt.max).join(" ");
  }

  return query;
}

export function sortUsersByPoints({ users, games, season }) {
  if (!users || !games || !season) return;

  games = games
    .filter((g) => {
      return g.status !== "canceled";
    })
    .filter((g) => {
      return g.reference === season.id;
    });

  users = users.map((user) => {
    const entriesLength = games.filter(
      ({ entries }) => entries.map((e) => e.id).indexOf(user.id) !== -1
    ).length;

    const points = games.map(({ entries, score }) => {
      const entry = entries[entries.map((e) => e.id).indexOf(user.id) ?? -1];
      return computePoints(entry, score);
    });

    return {
      ...user,
      entries: entriesLength,
      points: points.length !== 0 ? points.reduce((a, b) => a + b) : 0,
    };
  });

  return users.sort((user1, user2) => {
    if (user1.points === user2.points) {
      // Trabalhar no que jogou mais vezes
      return user1.entries > user2.entries;
    }

    return user1.points > user2.points;
  });
}

export function computePoints(entry, score) {
  if (!entry) return 0;
  if (![entry.visited, entry.visitor].every((e) => !Number.isNaN(e))) return 0;

  const myWinner = getWinner(entry);
  const currentWinner = getWinner(score);

  if (score.visited === entry.visited && score.visitor === entry.visitor) {
    return 2; // two Points
  }

  return myWinner === currentWinner ? 1 : 0; // one point
}

export function computeEntries(entries) {
  return {
    visited: entries?.filter((ent) => ent.visited > ent.visitor).length ?? 0,
    visitor: entries?.filter((ent) => ent.visited < ent.visitor).length ?? 0,
    draw: entries?.filter((ent) => ent.visited === ent.visitor).length ?? 0,
  };
}

export function getWinner({ visited, visitor }) {
  return Object.entries({
    visited: () => visited > visitor,
    visitor: () => visitor > visited,
    draw: () => visited === visitor,
  }).filter(([_winner, is]) => is())?.[0][0];
}

export function getSoccerGameById(games, filterId) {
  return games?.filter?.((game) => game.id === filterId)[0] ?? null;
}

export function teamsSearchFilter(teams) {
  return teams.map((team) => {
    return team.name;
  });
}

export function getGameState({ date, status }) {
  const currentDate = new Date();
  const gameDate = new Date(date);

  const diference = Math.abs(gameDate.getTime() - currentDate.getTime());
  const hours = Math.floor(diference / (1000 * 60 * 60));
  const minutes = Math.floor(diference / (1000 * 60));
  const seconds = Math.floor(diference / 1000);
  const days = Math.floor(hours / 24);

  const gameStates = {
    opened: currentDate < gameDate,
    running: currentDate >= gameDate,
    closed: status === "closed",
    canceled: status === "canceled",
  };

  const useTime = [
    [days, "d"],
    [hours, "h"],
    [minutes, "m"],
    [seconds, "s"],
  ]
    .filter(([time, unit]) => time)
    .shift();

  const displayGameState = {
    opened: `${useTime?.[0] ?? "0"}${useTime?.[1] ?? "s"}`,
    running: "andamento",
    closed: "encerrado",
    canceled: "cancelado",
  };

  return Object.keys(gameStates)
    .filter((key) => gameStates[key] === true)
    .map((key) => {
      return { state: key, display: displayGameState[key] };
    })
    .pop();
}
