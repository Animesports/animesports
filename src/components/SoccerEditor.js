import { useContext, useRef } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import { updateSoccerGame } from "../services/admin";
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
  if (gameState.state === "running") return SoccerUpdater(currentGame);

  // Editar a data, editar os times, editar a hora... O modal de criação, mas que atualizará.
  // Pode cancelar o jogo, mas não encerrá-lo
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

function SoccerUpdater(game) {
  // Atualizar o placar, pode cancelar, pode encerrar
  const formRef = useRef(null);
  const team1 = game.teams.visited;
  const team2 = game.teams.visitor;

  const time = ISOtimeFormat(game.date);
  const date = localDate(game.date);

  function handleChange({ target }) {
    const max = target.value.length < 2 ? target.value.length : 2;
    target.value = ("0".repeat(max) + target.value).slice(max * -1);
  }

  function handleSubmit(data) {
    const replaceNum = {
      visited: Number(data.visited),
      visitor: Number(data.visitor),
    };

    gameValidate(
      replaceNum,
      () => {
        console.info("game:", replaceNum);
      },
      formRef
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
          <button type="button">Atualizar Jogo</button>

          <div className={styles.dualButtonBox}>
            <button type="submit" className={styles.update}>
              Encerrar
            </button>
            <button type="button" className={styles.cancel}>
              Excluir
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
