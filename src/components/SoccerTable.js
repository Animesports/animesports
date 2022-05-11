import { useContext } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/SoccerTable.module.css";
import { getDisplayDate, organizeByDate, sortByDate } from "../utils/Date";
import { computeEntries, getGameState } from "../utils/Soccer";
import { Loading } from "./Loading";
import { Empty } from "./Empty";

export function SoccerTable({ disable, editable, customClass }) {
  const { fetching, games } = useContext(soccerContext);

  if (fetching === true) return <Loading />;
  if (games.length === 0)
    return <Empty descrition="Nenhum jogo foi agendado ainda" />;

  const groupGames = sortByDate(organizeByDate(games));
  disable = disable?.filter((item) => ["state"].includes(item)) ?? [];

  return (
    <table className={[styles.container, customClass].join(" ")}>
      {groupGames.map(({ group, games }, index) => {
        const { day, month, year, week } = getDisplayDate(group);

        return (
          <>
            <thead key={"head-soccer-index-" + index + group.toString()}>
              <tr className={styles.header}>
                <th colSpan="2">
                  <span>
                    {day}/{month}/{year} - {week}
                  </span>
                </th>

                <th>
                  <span>Placar</span>
                </th>

                <th>
                  <span>Fechamento</span>
                </th>

                {!disable.includes("state") && (
                  <>
                    <th>
                      <span>Visitado</span>
                    </th>

                    <th>
                      <span>Empate</span>
                    </th>

                    <th>
                      <span>Visitante</span>
                    </th>
                  </>
                )}

                {editable && <th></th>}
              </tr>
            </thead>

            <tbody key={"body-soccer-index-" + index + group.toString()}>
              {games.map(({ date, entries, score, teams, status }, index) => {
                const { hours, minutes } = getDisplayDate(date);
                const { state, display } = getGameState({ date, status });

                return (
                  <tr
                    key={
                      "body-child-soccer-index" +
                      index +
                      teams.visited.name +
                      teams.visitor.name
                    }
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
                        <span>
                          {score.visited} - {score.visitor}
                        </span>
                      )}
                      {["opened", "canceled"].includes(state) && <span>-</span>}
                    </td>
                    <td className={styles.display}>
                      <span>{display}</span>
                    </td>
                    {!disable.includes("state") && (
                      <>
                        <td className="visited">
                          <span>{computeEntries(entries).visited}</span>
                        </td>
                        <td className="draw">
                          <span>{computeEntries(entries).draw}</span>
                        </td>
                        <td className="visitor">
                          <span>{computeEntries(entries).visitor}</span>
                        </td>
                      </>
                    )}

                    {editable && (
                      <td>
                        {["running"].includes(state) && (
                          <button>Atualizar</button>
                        )}

                        {!["running"].includes(state) && (
                          <button>Editar</button>
                        )}
                      </td>
                    )}
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

export function makeADate({ compense }) {
  const date = new Date();
  date.setHours(date.getHours() + compense);
  return date;
}

function games() {
  return [
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
  ];
}
