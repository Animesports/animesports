export function teamsSearchFilter(teams) {
  return teams.map((team) => {
    return team.name;
  });
}

export function getGameState({ date, status }) {
  const currentDate = new Date();
  const gameDate = new Date(date);

  const gameStates = {
    opened: currentDate < gameDate,
    running: currentDate >= gameDate,
    closed: status === "closed",
    canceled: status === "canceled",
  };

  const displayGameState = {
    opened: "2H",
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
