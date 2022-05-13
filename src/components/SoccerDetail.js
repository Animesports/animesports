import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/SoccerDetail.module.css";
import { computePoints, getGameState } from "../utils/Soccer";

import { Loading } from "./Loading";
import { SoccerPlay, SoccerScore } from "./SoccerBlocks";

export function SoccerDetail({ select, onClose }) {
  const { fetching, games } = useContext(soccerContext);
  const { user } = useContext(authContext);

  if (!select) return null;

  function handleCloseModal() {
    typeof onClose === "function" && onClose();
  }

  if (fetching) {
    return <Loading />;
  }

  if (!fetching && games.length === 0) {
    return null;
  }

  const currentGame = games.filter(({ id }) => id === select)?.[0];

  if (!currentGame) {
    handleCloseModal();
    return null;
  }

  const gameStatusDisplay = {
    opened: "Aberto",
    closed: "Encerrado",
    running: "Em andamento",
    canceled: "Cancelado",
  };

  const { state, display } = getGameState(currentGame);
  const { teams } = currentGame;

  const myEntrie = currentGame.entries.filter(
    (entrie) => entrie.id === user.id
  )?.[0];

  return (
    <div className={styles.container}>
      <div className={styles.teams}>
        <div className={styles.teamBox}>
          <img src={teams.visited.logo} alt={teams.visited.code} />
          <span>{teams.visited.name}</span>
        </div>

        <span className={styles.separator}></span>

        <div className={styles.teamBox}>
          <img src={teams.visitor.logo} alt={teams.visited.code} />
          <span>{teams.visitor.name}</span>
        </div>
      </div>

      <div className={styles.statusBox}>
        <div className={styles.statusName}>
          <span>{gameStatusDisplay[state]}</span>
        </div>
        {state === "running" && (
          <p className={[styles.statusDetail, styles.running].join(" ")}>
            {computePoints(myEntrie, currentGame.score)}P
          </p>
        )}
        {state === "opened" && (
          <p className={[styles.statusDetail, styles.opened].join(" ")}>
            Termina em {display}
          </p>
        )}

        {state === "closed" && (
          <p className={[styles.statusDetail, styles.closed].join(" ")}>
            {computePoints(myEntrie, currentGame.score)}P
          </p>
        )}

        {state === "canceled" && (
          <p className={[styles.statusDetail, styles.canceled].join(" ")}>
            {computePoints(myEntrie, currentGame.score)}P
          </p>
        )}
      </div>

      {["closed", "running"].includes(state) && (
        <SoccerScore game={currentGame} myEntrie={myEntrie} />
      )}

      {["opened"].includes(state) && <SoccerPlay game={currentGame} />}

      <span
        onClick={handleCloseModal}
        className={[styles.close, "close-button"].join(" ")}
      >
        X
      </span>
    </div>
  );
}
