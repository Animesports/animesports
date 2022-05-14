import { useContext } from "react";
import { soccerContext } from "../contexts/SoccerContext";
import { updateSoccerGame } from "../services/admin";
import { getGameState, getSoccerGameById } from "../utils/Soccer";
import { Loading } from "./Loading";
import { SoccerScheduler } from "./SoccerScheduler";

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

function SoccerUpdater(game) {
  // Atualizar o placar, pode cancelar, pode encerrar
  return <p>Atualizar Jogo</p>;
}
