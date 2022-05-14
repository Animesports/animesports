import styles from "../styles/components/AdminBlocks.module.css";
import Router from "next/router";
import { useContext } from "react";
import { seasonContext } from "../contexts/SeasonContext";
import { adminContext } from "../contexts/AdminContext";
import { Loading } from "./Loading";
import { currency, plural } from "../utils/Global";
import { soccerContext } from "../contexts/SoccerContext";
import { getGameState } from "../utils/Soccer";

export function AdminBlocks() {
  const { season, fetched } = useContext(seasonContext);
  const { games } = useContext(soccerContext);
  const { users } = useContext(adminContext);
  const blocks = [
    ["Usuário", users.length, "/icons/group.svg", "number", "/admin/users"],
    ["Montante", season.amount, "/icons/coins.svg", "cash", "/admin/payments"],
    ["Ingresso", season.ticket, "/icons/money.svg", "cash", "/admin/payments"],
    [
      "Agendado",
      games.filter((game) => {
        return getGameState(game).state === "opened";
      }).length,
      "/icons/schedule.svg",
      "number",
      "/admin/calendar",
    ],
  ];

  function navigateTo(url) {
    Router.push(url);
  }

  return (
    <div className={styles.container}>
      {blocks.map(([name, value, icon, type, redirect], index) => {
        if (!fetched)
          return (
            <div className={styles.block}>
              <Loading />
            </div>
          );

        return (
          <div
            onClick={() => navigateTo(redirect)}
            className={styles.block}
            key={type + index}
          >
            <div className={styles.icon}>
              <img src={icon} alt={type} />
            </div>

            <div className={styles.blockContent}>
              <div>
                {type === "number" && (
                  <span className={styles.value}>{value}</span>
                )}

                {type === "cash" && (
                  <>
                    <span className={styles.symbol}>R$</span>
                    <span className={styles.value}>
                      {currency().getReals(value)}
                    </span>
                    <span className={styles.cents}>
                      ,{currency().getCents(value)}
                    </span>
                  </>
                )}
              </div>

              <span className={styles.name}>
                {(type === "number" && plural(value).convert(name)) || name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
