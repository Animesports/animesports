import { useContext } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import styles from "../styles/components/SoccerDetail.module.css";

export function SoccerDetail() {
  const { modalVisible, changeModalState } = useContext(soccerContext);

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
