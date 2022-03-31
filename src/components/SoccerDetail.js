import { useContext } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/SoccerDetail.module.css";
import { SoccerPlay, SoccerScore } from "./SoccerBlocks";

export function SoccerDetail() {
  const { modalVisible, changeModalState } = useContext(soccerContext);

  const gameStatus = ["opened", "canceled", "running", "closed"][0];

  const gameStatusDisplay = {
    opened: "Aberto",
    closed: "Encerrado",
    running: "Em andamento",
    canceled: "Cancelado",
  };

  return (
    <>
      {modalVisible && (
        <div className={styles.container}>
          <div className={styles.teams}>
            <div className={styles.teamBox}>
              <img src="/team1-demo.svg" alt="team-demo" />
              <span>Flamengo</span>
            </div>

            <span className={styles.separator}></span>

            <div className={styles.teamBox}>
              <img src="/team1-demo.svg" alt="team-demo" />
              <span>São Paulo</span>
            </div>
          </div>

          <div className={styles.statusBox}>
            <div className={styles.statusName}>
              <span>{gameStatusDisplay[gameStatus]}</span>
            </div>
            {gameStatus === "running" && (
              <p className={[styles.statusDetail, styles.running].join(" ")}>
                2P
              </p>
            )}
            {gameStatus === "opened" && (
              <p className={[styles.statusDetail, styles.opened].join(" ")}>
                Fechamento em 2H
              </p>
            )}

            {gameStatus === "closed" && (
              <p className={[styles.statusDetail, styles.closed].join(" ")}>
                5P
              </p>
            )}

            {gameStatus === "canceled" && (
              <p className={[styles.statusDetail, styles.canceled].join(" ")}>
                0P
              </p>
            )}
          </div>

          {["closed", "running"].includes(gameStatus) && <SoccerScore />}

          {["opened"].includes(gameStatus) && <SoccerPlay />}

          <span
            onClick={changeModalState}
            className={[styles.close, "close-button"].join(" ")}
          >
            X
          </span>
        </div>
      )}
    </>
  );
}
