import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SoccerStyles from "../styles/pages/Soccer.module.css";
import styles from "../styles/pages/Leagues.module.css";
import leagues from "../../leagues.json";

export default function Leagues() {
  const score = 72;

  const [ref, [offset, setOffset]] = [useRef(null), useState(null)];

  const progress = getProgressLeague({ league: getMyLeague({ score }) });
  const distance = progress.next.points - progress.current.points;

  const runne = score - progress.current.points;
  const percent = (runne / distance) * 100;

  const lineWidth =
    (progress.isTheLastLeague && "100%") ||
    `${
      offset && !progress.isTheLastLeague ? 50 + 50 * (percent / 100) : percent
    }%`;

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (480 <= window.innerWidth) return setOffset(true);
      return setOffset(false);
    });

    if (480 <= window.innerWidth) return setOffset(true);
    setOffset(false);
  }, []);

  return (
    <div ref={ref} className={`${SoccerStyles.container} container-fwh`}>
      <Header use="all" parentNode={ref} />
      <div className={`${SoccerStyles.content} ${styles.content}`}>
        <div className={styles.progressBox}>
          <div className={styles.progressBar}>
            <span>{score}</span>
            <div className={styles.progressGroup}>
              {progress.progressElement}

              <div className={styles.progressLine}>
                <div
                  style={{
                    width: lineWidth,
                    background: `var(--${progress.current.name})`,
                  }}
                  className={styles.currentLine}
                ></div>
              </div>
            </div>
            <span>
              {progress.isTheLastLeague ? "máx." : progress.next.points}
            </span>
          </div>

          <h3
            style={{ color: `var(--${progress.current.name})` }}
            className={styles.currentTitle}
          >
            {progress.current.display}
          </h3>
        </div>
        <div className={styles.leaguesList}>
          <span>Vença mais jogos consecutivos para avançar de liga</span>
          <div className={styles.allLeagues}>{getAllLeagues()}</div>
        </div>
      </div>
    </div>
  );
}

function getMyLeague({ score }) {
  if (score < leagues[leagues.length - 1].points) {
    return leagues[leagues.length - 1].name;
  }
  return leagues.filter((league) => {
    return league.points <= score;
  })[0].name;
}

function getProgressLeague({ league }) {
  const current = league;
  let currentIndex = leagues
    .map(({ name }, index) => {
      return { name, index };
    })
    .filter(({ name }) => name === current)[0]?.index;

  currentIndex = currentIndex ?? leagues.length - 3;

  const completedLeagues = leagues
    .slice(currentIndex + 1, currentIndex + (currentIndex === 0 ? 2 : 4))
    .reverse();
  const nextLeague = leagues[currentIndex - 1] ?? leagues[0];
  const currentLeague = leagues[currentIndex];

  return {
    next: nextLeague,
    isTheLastLeague: currentIndex === 0,
    completed: completedLeagues,
    current: currentLeague,
    progressElement: (
      <>
        <div
          className={`${styles.completedGroup} ${
            styles[`index${completedLeagues.length}`]
          }`}
        >
          {completedLeagues.map(({ name, display, image }, index) => {
            return (
              <div key={name + index}>
                <img src={image} alt={name} />
              </div>
            );
          })}

          {currentLeague.name !== leagues[0].name && (
            <div
              className={` ${styles.currentLeague} ${
                completedLeagues.length === 0 && styles.without
              }`}
            >
              <img src={currentLeague.image} alt={currentLeague.name} />
            </div>
          )}
        </div>
        <div>
          <img src={nextLeague.image} alt={nextLeague.name} />
        </div>
      </>
    ),
  };
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
