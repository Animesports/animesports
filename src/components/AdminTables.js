import Router from "next/router";
import { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/AdminTables.module.css";
import { getDisplayDate } from "../utils/Date";
import { getGameState } from "../utils/Soccer";
import { Empty } from "./Empty";
import { Loading } from "./Loading";

export function AdminTables() {
  const {
    fetched,
    ["payments"]: admPayments,
    users,
  } = useContext(adminContext);

  const payments = admPayments.filter((p) => p.verified === false);

  const { games, ["fetching"]: soccerFetching } = useContext(soccerContext);
  const filteredGames = games.filter(
    (game) => getGameState(game).state === "running"
  );

  return (
    <div className={styles.container}>
      <table className={[styles.paymentTable, "appear"].join(" ")}>
        <thead>
          <tr>
            <th colSpan="2">
              <span>PAGAMENTOS</span>
            </th>
          </tr>
        </thead>

        {!fetched && <Loading />}
        {fetched && payments.length === 0 && (
          <tbody>
            <tr>
              <Empty
                className={styles.emptyBox}
                descrition="Nenhum pagamento pendente"
                title=" "
              />
            </tr>
          </tbody>
        )}
        {fetched && payments.length > 0 && (
          <tbody>
            {payments.map(({ reference, id, type }, index) => {
              return (
                <tr key={id + index}>
                  <td>
                    <span>
                      {users.filter((u) => u.id === reference)[0]?.data.name}
                    </span>
                  </td>

                  <td className={styles.payId}>
                    <span>{id}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        Router.push("/admin/payments");
                      }}
                    >
                      {type === "send" ? "Pagar" : "Receber"}
                      {
                        //TODO: Adicionar função de pagar e receber
                      }
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      <table className={[styles.soccerTable, "appear", "delay100"].join(" ")}>
        <thead>
          <tr>
            <th colSpan="3">
              <span>JOGOS</span>
            </th>
          </tr>
        </thead>

        {soccerFetching && <Loading />}
        {!soccerFetching && filteredGames.length === 0 && (
          <tbody>
            <tr>
              <Empty
                className={styles.emptyBox}
                descrition="Nenhum jogo em andamento"
                title=" "
              />
            </tr>
          </tbody>
        )}
        {!soccerFetching && filteredGames.length > 0 && (
          <tbody>
            {filteredGames.map(({ date, id, teams }, index) => {
              const { hours, minutes } = getDisplayDate(date);

              return (
                <tr key={"adm games" + index}>
                  <td className={styles.hour}>
                    <span>
                      {hours}:{minutes}
                    </span>
                  </td>
                  <td>
                    <span>
                      {teams.visited.name} - {teams.visitor.name}
                    </span>
                  </td>

                  <td>
                    <button>Atualizar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
