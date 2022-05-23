import styles from "../styles/components/LeadboardTable.module.css";
import { useContext } from "react";
import { seasonContext } from "../contexts/SeasonContext";
import { soccerContext } from "../contexts/SoccerContext";
import { Loading } from "./Loading";
import { sortUsersByPoints } from "../utils/Soccer";
import { Empty } from "./Empty";

export function LeadboardTable({ editable, disable, customClass, title }) {
  disable =
    disable?.filter((item) => ["hits", "position"].includes(item)) ?? [];

  const { users, season, fetched } = useContext(seasonContext);
  const { games, fetching } = useContext(soccerContext);

  if (fetching || !fetched) {
    return <Loading />;
  }

  if (fetched && users.length === 0) {
    return (
      <Empty
        className={styles.empty}
        title="Nada para exibir"
        descrition="Nenhum jogador está participando ainda"
      />
    );
  }

  const ordenedUsers = sortUsersByPoints({ users, games, season });

  return (
    <table className={[styles.container, customClass].join(" ")}>
      <thead>
        <tr className={styles.header}>
          <th
            colSpan={(!disable.includes("position") && "2") || "1"}
            className={[styles.position, styles.profile].join(" ")}
          >
            <span>{title || "Melhores jogadores"}</span>
          </th>

          <th className={styles.league}></th>

          <th className={styles.leagueName}>
            <span>Liga</span>
          </th>
          {!disable.includes("hits") && (
            <th className={styles.hits}>
              <span>Pontos</span>
            </th>
          )}
          {editable && (
            <>
              <th></th>
              <th></th>
              <th></th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {ordenedUsers.map(
          ({ ["data"]: { name }, picture, points }, position) => {
            return (
              <tr className={styles.row} key={name + position}>
                {!disable.includes("position") && (
                  <td className={["position", styles.position].join(" ")}>
                    <div>
                      {[0, 1, 2].includes(position) && (
                        <img
                          src={`/icons/award${position + 1}.svg`}
                          alt={position}
                        />
                      )}
                      {![0, 1, 2].includes(position) && <span>{position}</span>}
                    </div>
                  </td>
                )}
                <td className={["profile", styles.profile].join(" ")}>
                  <div>
                    <img src={picture ?? "/icons/user.svg"} alt="user" />
                    <span>{name}</span>
                  </div>
                </td>
                <td className={["league", styles.league].join(" ")}>
                  <div>
                    <img src="/icons/none.svg" alt={"Nenhuma"} />
                  </div>
                </td>
                <td className={styles.leagueName}>
                  <div>
                    <span className="none">Nenhuma</span>
                  </div>
                </td>
                {!disable.includes("hits") && (
                  <td className={["hits", styles.hits].join(" ")}>
                    <span>{points}</span>
                  </td>
                )}

                {editable && (
                  <>
                    <td className={styles.editable}>
                      <img src="/icons/email.svg" alt="email" />
                    </td>

                    <td className={styles.editable}>
                      <img src="/icons/info.svg" alt="i" />
                    </td>

                    <td className={[styles.editable, styles.trash].join(" ")}>
                      <img src="/icons/delete.svg" alt="del" />
                    </td>
                  </>
                )}
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
