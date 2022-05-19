import { useContext, useRef, useState } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import { authContext } from "../contexts/AuthContext";
import {
  closeSoccerGame,
  deleteSoccerGame,
  updateGameScore,
  updateSoccerGame,
} from "../services/admin";
import { getGameState, getSoccerGameById } from "../utils/Soccer";
import { Loading } from "./Loading";
import { SoccerScheduler } from "./SoccerScheduler";
import { Input } from "./Input";
import { Form } from "@unform/web";
import styles from "../styles/components/SoccerEditor.module.css";

export function SoccerEditor({ gameId, close }) {
  const { games, fetching } = useContext(soccerContext);
  const currentGame = getSoccerGameById(games, gameId);

  if (fetching) return <Loading />;
  if (!fetching && (!currentGame || games.length === 0)) {
    close();
    return <span></span>;
  }

  const gameState = getGameState(currentGame);
  if (gameState.state === "running") return SoccerUpdater(currentGame, close);

  if (["canceled"].includes(gameState.state)) {
    return (
      <ModalCloseMessage
        title="Cancelado!"
        text="Este jogo foi cancelado e não pode ser editado."
        close={close}
      />
    );
  }

  if (["closed"].includes(gameState.state)) {
    return (
      <ModalCloseMessage
        title="Encerrado!"
        text="Este jogo foi encerrado e não pode ser editado."
        close={close}
      />
    );
  }

  return (
    <SoccerScheduler
      message={{
        title: "Atualizado!",
        text: "O jogo foi atualizado com sucesso.",
      }}
      close={close}
      initial={currentGame}
      onSubmit={updateSoccerGame}
      buttonText="Editar"
    />
  );
}

import cStyles from "../styles/components/SoccerScheduler.module.css";
import { firstWord, low } from "../utils/Global";
import { ISOtimeFormat, localDate } from "../utils/Date";
import { gameValidate } from "../utils/Yup";
import { ModalCloseMessage } from "./ModalCloseMessage";
import { ModalConfirmation } from "./ModalConfirmation";

function SoccerUpdater(game, close) {
  // Atualizar o placar, pode cancelar, pode encerrar

  const formRef = useRef(null);
  const team1 = game.teams.visited;
  const team2 = game.teams.visitor;

  const time = ISOtimeFormat(game.date);
  const date = localDate(game.date);

  const [currentModal, setCurrentModal] = useState("initial");

  const { sessionId } = useContext(authContext);

  const [score, setScore] = useState({
    visited: game.score.visited,
    visitor: game.score.visitor,
  });

  function handleChange({ target }) {
    const max = target.value.length < 2 ? target.value.length : 2;
    target.value = ("0".repeat(max) + target.value).slice(max * -1);

    score[target.name] = Number(target.value);
    setScore(score);
  }

  function handleSubmit(data) {
    const replaceNum = {
      visited: Number(data.visited),
      visitor: Number(data.visitor),
    };

    gameValidate(
      replaceNum,
      () => {
        updateGameScore({ id: game.id, score: replaceNum }, sessionId).then(
          (result) => {
            if (result.acknowledged) {
              game.score = replaceNum;

              setCurrentModal("close-update");
            }
          }
        );
      },
      formRef
    );
  }

  function handlePreClose() {
    setCurrentModal("pre-close");
  }

  function handleCloseGame() {
    closeSoccerGame({ id: game.id, score }, sessionId);
  }

  function handleDelete() {
    deleteSoccerGame(game, sessionId).then((result) => {
      if (result.acknowledged) {
        console.info("deleted");
        setCurrentModal("close-delete");
        game.status = "canceled";
      }
    });
  }

  if (currentModal === "close") {
    return (
      <ModalCloseMessage
        title="Encerrado!"
        text="O jogo foi encerrado com sucesso"
        close={close}
      />
    );
  }

  if (currentModal === "close-update") {
    return (
      <ModalCloseMessage
        title="Atualizado!"
        text="O jogo foi atualizado com sucesso"
        cancel={() => setCurrentModal("initial")}
        close={close}
      />
    );
  }

  if (currentModal === "close-delete") {
    return (
      <ModalCloseMessage
        title="Cancelado!"
        text="O jogo foi cancelado com sucesso"
        close={close}
      />
    );
  }

  if (currentModal === "pre-close") {
    const name1 = firstWord(team1.name, { min: 3, abb: true, max: 6 });
    const name2 = firstWord(team2.name, { min: 3, abb: true, max: 6 });

    return (
      <ModalConfirmation
        title="Encerrar Jogo"
        message={
          <>
            O jogo será encerrado permanentemente com o placar
            <p className={styles.score}>
              {name1}{" "}
              <strong>
                ({score.visited}) x ({score.visitor})
              </strong>{" "}
              {name2}
            </p>
          </>
        }
        close={() => {
          setCurrentModal("initial");
        }}
        callBack={handleCloseGame}
      />
    );
  }

  return (
    <div className={[cStyles.container, styles.container].join(" ")}>
      <Form ref={formRef} className={cStyles.content} onSubmit={handleSubmit}>
        <div className={cStyles.previewBox}>
          <div className={cStyles.previewContent}>
            <div className={cStyles.title}>
              <strong>
                Começou {time} • {date}
              </strong>
            </div>
            <div className={[cStyles.teamsBox, styles.teamsBox].join(" ")}>
              <div>
                <img
                  src={team1.logo ?? "/icons/soccer-shield.svg"}
                  alt={team1.id}
                />
                <strong>
                  {firstWord(low(team1.name), { min: 3, abb: true, max: 6 }) ??
                    "Time"}
                </strong>

                <Input
                  name="visited"
                  placeholder="0"
                  defaultValue={game.score.visited}
                  min={0}
                  autoComplete="off"
                  type="number"
                  onChange={handleChange}
                />
              </div>

              <div>
                <img
                  src={team2.logo ?? "/icons/soccer-shield.svg"}
                  alt={team2.id}
                />
                <strong>
                  {firstWord(low(team2.name), { min: 3, abb: true, max: 6 }) ??
                    "Time"}
                </strong>

                <Input
                  name="visitor"
                  placeholder="0"
                  defaultValue={game.score.visitor}
                  min={0}
                  autoComplete="off"
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonBox}>
          <button onClick={handlePreClose} type="button">
            Encerrar Jogo
          </button>

          <div className={styles.dualButtonBox}>
            <button type="submit" className={styles.update}>
              Atualizar
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className={styles.cancel}
            >
              Excluir
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
