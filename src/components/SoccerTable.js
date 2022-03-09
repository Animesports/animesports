import styles from "../styles/components/SoccerTable.module.css";
import { getDisplayDate, organizeByDate, sortByDate } from "../utils/Date";
import { getGameState } from "../utils/Soccer";

export function SoccerTable() {
  const groupGames = sortByDate(organizeByDate(games()));

  return (
    <table className={`${styles.container}`}>
      {groupGames.map(({ group, games }, index) => {
        const { day, month, year } = getDisplayDate(group);
        return (
          <>
            <thead key={group + "-head-" + index}>
              <tr className={styles.header}>
                <th colSpan="2">
                  <span>
                    {day}/{month}/{year} - Sexta
                  </span>
                </th>
                <th>
                  <span>Placar</span>
                </th>
                <th>
                  <span>Fechamento</span>
                </th>
                <th>
                  <span>Visitado</span>
                </th>
                <th>
                  <span>Empate</span>
                </th>
                <th>
                  <span>Visitante</span>
                </th>
              </tr>
            </thead>

            <tbody key={group + "-body-" + index}>
              {games.map(({ date, entries, score, teams, status }, index) => {
                const { hours, minutes } = getDisplayDate(date);
                const { state, display } = getGameState({ date, status });

                return (
                  <tr
                    key={date + index}
                    className={[styles.row, styles[`closure_${state}`]].join(
                      " "
                    )}
                  >
                    <td className="hour">
                      <span>
                        {hours}:{minutes}
                      </span>
                    </td>
                    <td className="teams">
                      <span>
                        {teams.visited.name} - {teams.visitor.name}
                      </span>
                    </td>
                    <td className="score">
                      {!["opened", "canceled"].includes(state) && (
                        <span>{score.join(" - ")}</span>
                      )}
                      {["opened", "canceled"].includes(state) && <span>-</span>}
                    </td>
                    <td className={styles.display}>
                      <span>{display}</span>
                    </td>
                    <td className="visited">
                      <span>{entries.visited}</span>
                    </td>
                    <td className="draw">
                      <span>{entries.draw}</span>
                    </td>
                    <td className="visitor">
                      <span>{entries.visitor}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        );
      })}
    </table>
  );
}

//
// DEMO: Change later
//

function makeADate({ compense }) {
  const date = new Date();
  date.setHours(date.getHours() + compense);
  return date;
}

function games() {
  // DEMO: Example of input element data
  const runningGame = {
    date: makeADate({ compense: 0 }),
    score: [1, 4],
    entries: {
      visited: 2,
      draw: 7,
      visitor: 32,
    },
    teams: {
      visited: {
        id: 121,
        name: "Palmeiras",
        code: "PAL",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/121.png",
      },
      visitor: {
        id: 126,
        name: "Sao Paulo",
        code: "PAU",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/126.png",
      },
    },
  };

  const OpenedGame = {
    date: makeADate({ compense: 42 }),
    score: [0, 0],
    entries: {
      visited: 7,
      draw: 32,
      visitor: 2,
    },
    teams: {
      visited: {
        id: 121,
        name: "Flamengo",
        code: "PAL",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/121.png",
      },
      visitor: {
        id: 126,
        name: "Grêmio",
        code: "PAU",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/126.png",
      },
    },
  };

  const closedGame = {
    date: makeADate({ compense: -12 }),
    status: "closed",
    score: [5, 1],
    entries: {
      visited: 7,
      draw: 32,
      visitor: 2,
    },
    teams: {
      visited: {
        id: 121,
        name: "Inter",
        code: "PAL",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/121.png",
      },
      visitor: {
        id: 126,
        name: "Sao Paulo",
        code: "PAU",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/126.png",
      },
    },
  };

  const canceledGame = {
    date: makeADate({ compense: +3 }),
    status: "canceled",
    score: [7, 1],
    entries: {
      visited: 7,
      draw: 32,
      visitor: 2,
    },
    teams: {
      visited: {
        id: 121,
        name: "Alemanha",
        code: "PAL",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/121.png",
      },
      visitor: {
        id: 126,
        name: "Brasil",
        code: "PAU",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/teams/126.png",
      },
    },
  };

  return [
    runningGame,
    OpenedGame,
    closedGame,
    canceledGame,
    {
      date: makeADate({ compense: -19 }),
      status: "closed",
      score: [5, 1],
      entries: {
        visited: 7,
        draw: 32,
        visitor: 2,
      },
      teams: {
        visited: {
          id: 121,
          name: "Bahia",
          code: "PAL",
          country: "Brazil",
          logo: "https://media.api-sports.io/football/teams/121.png",
        },
        visitor: {
          id: 126,
          name: "Peru",
          code: "PAU",
          country: "Brazil",
          logo: "https://media.api-sports.io/football/teams/126.png",
        },
      },
    },
    {
      date: makeADate({ compense: +6 }),
      score: [0, 0],
      entries: {
        visited: 7,
        draw: 32,
        visitor: 2,
      },
      teams: {
        visited: {
          id: 121,
          name: "Tricolor",
          code: "PAL",
          country: "Brazil",
          logo: "https://media.api-sports.io/football/teams/121.png",
        },
        visitor: {
          id: 126,
          name: "Paulista",
          code: "PAU",
          country: "Brazil",
          logo: "https://media.api-sports.io/football/teams/126.png",
        },
      },
    },
  ];
}
