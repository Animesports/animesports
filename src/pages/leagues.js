import styles from "../styles/pages/Leagues.module.css";
import leagues from "../../leagues.json";
import { Structure } from "../components/Structure";
import { MyLeague } from "../components/MyLeague";
import { OnlyRegisteredUsers } from "../services/auth";

import { HideContent } from "../components/HideContent";

export default function Leagues() {
  return (
    <Structure contentClass={styles.content}>
      <div className={styles.progressBox}>
        {OnlyRegisteredUsers(
          () => (
            <MyLeague />
          ),
          () => (
            <HideContent text="para ver sua liga atual" />
          )
        )}
      </div>

      <div className={styles.leaguesList}>
        <span>Vença mais jogos consecutivos para avançar de liga</span>
        <div className={styles.allLeagues}>{getAllLeagues()}</div>
      </div>
    </Structure>
  );
}

function getAllLeagues() {
  return leagues
    .map(({ name, image, points, display }, index) => {
      return (
        <div
          onMouseLeave={() => {
            document
              .getElementById(name + "league_display")
              .classList.remove(styles.visible);
          }}
          onMouseEnter={() => {
            document
              .getElementById(name + "league_display")
              .classList.add(styles.visible);
          }}
          key={name + index}
        >
          <img src={image} alt={name} />
          <div
            style={{
              background: `var(--${name})`,
              maxHeight: `${15 / (index + 1)}rem`,
            }}
          >
            {points}
          </div>

          <div id={name + "league_display"} className={styles.leagueDisplay}>
            <span>{display}</span>
            <span className={styles.displayPin}></span>
          </div>
        </div>
      );
    })
    .reverse();
}
