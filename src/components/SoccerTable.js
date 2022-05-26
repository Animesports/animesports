import { useContext } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/SoccerTable.module.css";
import { getDisplayDate, organizeByDate, sortByDate } from "../utils/Date";
import { computeEntries, getGameState } from "../utils/Soccer";
import { Loading } from "./Loading";
import { Empty } from "./Empty";
import { firstWord } from "../utils/Global";

export function SoccerTable({
  disable,
  editable,
  customClass,
  onSelect,
  onlyButtom,
  filter,
}) {
  const { fetching, games } = useContext(soccerContext);

  if (fetching === true) return <Loading />;
  if (!fetching && games.length === 0)
    return <Empty descrition="Nenhum jogo foi agendado ainda" />;

  const groupGames = sortByDate(organizeByDate(games));

  disable = disable?.filter((item) => ["state"].includes(item)) ?? [];

  return (
    <table className={[styles.container, customClass].join(" ")}>
      {groupGames
        .filter(({ games }) => {
          return (
            games.filter((game) => {
              if (!filter || filter.length === 0) return true;
              return filter.map((f) => f.id).includes(game.id);
            }).length !== 0
          );
        })
        .map(({ group, games }, index) => {
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
                {games.map(
                  ({ date, entries, score, teams, status, id }, index) => {
                    const { hours, minutes } = getDisplayDate(date);
                    const { state, display } = getGameState({ date, status });

                    return (
                      <tr
                        onClick={() => {
                          state !== "canceled" && onSelect(id);
                        }}
                        key={
                          "body-child-soccer-index" +
                          index +
                          teams.visited.name +
                          teams.visitor.name
                        }
                        className={[
                          styles.row,
                          styles[`closure_${state}`],
                        ].join(" ")}
                      >
                        <td className="hour">
                          <span>
                            {hours}:{minutes}
                          </span>
                        </td>
                        <td className="teams">
                          <span>
                            {firstWord(teams.visited.name, {
                              min: 3,
                              abb: true,
                              max: 6,
                            })}
                            {" - "}
                            {firstWord(teams.visitor.name, {
                              min: 3,
                              abb: true,
                              max: 6,
                            })}
                          </span>
                        </td>
                        <td className="score">
                          {!["opened", "canceled"].includes(state) && (
                            <span>
                              {score.visited} - {score.visitor}
                            </span>
                          )}
                          {["opened", "canceled"].includes(state) && (
                            <span>-</span>
                          )}
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
                            {state !== "canceled" && state !== "closed" && (
                              <button
                                onClick={() => {
                                  onSelect(id);
                                }}
                              >
                                {["running"].includes(state)
                                  ? "Atualizar"
                                  : "Editar"}
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </>
          );
        })}
    </table>
  );
}
