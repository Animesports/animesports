export function computePoints(entry, score) {
  if (!entry?.visited || !entry?.visitor) return 0;

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
  }).filter(([_winner, is]) => is)?.[0];
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
  const hours = Math.ceil(diference / (1000 * 60 * 60));
  const days = Math.ceil(hours / 24);

  const gameStates = {
    opened: currentDate < gameDate,
    running: currentDate >= gameDate,
    closed: status === "closed",
    canceled: status === "canceled",
  };

  const displayGameState = {
    opened: hours > 24 ? `${days}d` : `${hours}h`,
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
