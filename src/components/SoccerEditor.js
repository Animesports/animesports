import { useContext } from "react";
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
import { low } from "../utils/Global";
import { ISOtimeFormat, localDate } from "../utils/Date";

function SoccerUpdater(game) {
  // Atualizar o placar, pode cancelar, pode encerrar
  const team1 = game.teams.visited;
  const team2 = game.teams.visitor;

  const time = ISOtimeFormat(game.date);
  const date = localDate(game.date);

  function handleSubmit() {}

  return (
    <div className={[cStyles.container, styles.container].join(" ")}>
      <Form className={cStyles.content} onSubmit={handleSubmit}>
        <div className={cStyles.previewBox}>
          <div className={cStyles.previewContent}>
            <div className={cStyles.title}>
              <strong>
                Começou {time} • {date}
              </strong>
            </div>
            <div className={cStyles.teamsBox}>
              <div>
                <img
                  src={team1.logo ?? "/icons/soccer-shield.svg"}
                  alt={team1.id}
                />
                <strong>{low(team1.name) ?? "Time"}</strong>

                <Input
                  name="visited"
                  placeholder="0"
                  defaultValue={game.score.visited}
                  min={0}
                  autoComplete="off"
                  type="number"
                />
              </div>

              <span className={cStyles.separator}>X</span>

              <div>
                <img
                  src={team2.logo ?? "/icons/soccer-shield.svg"}
                  alt={team2.id}
                />
                <strong>{low(team2.name) ?? "Time"}</strong>

                <Input
                  name="visitor"
                  placeholder="0"
                  defaultValue={game.score.visitor}
                  min={0}
                  autoComplete="off"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonBox}>
          <div className={styles.dualButtonBox}>
            <button className={styles.update}>Atualizar</button>
            <button className={styles.cancel}>Excluir</button>
          </div>

          <button>Encerrar Jogo</button>
        </div>
      </Form>
    </div>
  );
}
