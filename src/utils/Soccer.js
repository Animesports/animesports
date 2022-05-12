export function computeEntries(entries) {
  return {
    visited: entries?.filter((ent) => ent.visited > ent.visitor).length ?? 0,
    visitor: entries?.filter((ent) => ent.visited < ent.visitor).length ?? 0,
    draw: entries?.filter((ent) => ent.visited === ent.visitor).length ?? 0,
  };
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
