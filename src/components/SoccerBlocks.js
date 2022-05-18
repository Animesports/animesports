import { Form } from "@unform/web";
import { useContext, useRef, useState } from "react";
import { OnlyRegisteredUsers } from "../services/auth";
import styles from "../styles/components/SoccerBlocks.module.css";
import { useNextOnEnter } from "../utils/Inputs";
import { Input } from "./Input";
import { HideContent } from "./HideContent";
import { gameValidate } from "../utils/Yup";
import { computeEntries, getWinner } from "../utils/Soccer";

export function SoccerScore({ ["game"]: { teams, score }, myEntrie }) {
  const myWinner = myEntrie && getWinner(myEntrie);

  const visitedName = firstWord(teams.visited.name, {
    min: 3,
    abb: true,
    max: 6,
  });

  const visitorName = firstWord(teams.visitor.name, {
    min: 3,
    abb: true,
    max: 6,
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.standBox}>
          {OnlyRegisteredUsers(
            () => {
              return (
                <>
                  {!myEntrie && (
                    <ModalCloseMessage
                      title=" "
                      text="Você não fez nenhum palpite"
                      className={styles.message}
                    />
                  )}

                  {myEntrie && (
                    <table>
                      <thead>
                        <tr>
                          <th colSpan={2}>Meu Jogo</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Vencedor</td>
                          {["draw"].includes(myWinner) && <td>Empate</td>}
                          {["visited", "visitor"].includes(myWinner) && (
                            <td>
                              {firstWord(teams[myWinner].name, {
                                min: 3,
                                abb: true,
                                max: 6,
                              })}
                            </td>
                          )}
                        </tr>

                        <tr>
                          <td>Palpite</td>
                          <td>
                            {myEntrie.visited} - {myEntrie.visitor}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </>
              );
            },
            () => (
              <HideContent vertical text="para ver seus resultados" />
            )
          )}
        </div>

        <div className={styles.standBox}>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Placar</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  {firstWord(visitedName, {
                    min: 3,
                    abb: true,
                    max: 6,
                  })}
                </td>
                <td>{score.visited}</td>
              </tr>

              <tr>
                <td>
                  {firstWord(visitorName, {
                    min: 3,
                    abb: true,
                    max: 6,
                  })}
                </td>
                <td>{score.visitor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { ModalCloseMessage } from "./ModalCloseMessage";
import { updateSoccerEntry } from "../services/soccer";
import { authContext } from "../contexts/AuthContext";
import { soccerContext } from "../contexts/SoccerContext";
import { firstWord, slice } from "../utils/Global";

export function SoccerPlay({ game }) {
  const { teams, id } = game;
  const entries = computeEntries(game.entries);

  const visitedName = firstWord(teams.visited.name, {
    min: 3,
    abb: true,
    max: 6,
  });

  const visitorName = firstWord(teams.visitor.name, {
    min: 3,
    abb: true,
    max: 6,
  });

  const formRef = useRef(null);
  const [currentModal, setCurrentModal] = useState("initial");
  const { sessionId, user } = useContext(authContext);
  const { updateGame } = useContext(soccerContext);

  const myEntry = game.entries.filter((e) => e.id === user.id).pop();

  function handlePlaySubmit(data) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNextOnEnter(
      [
        formRef.current.getFieldRef("visited"),
        formRef.current.getFieldRef("visitor"),
      ],
      () => {
        const entry = {
          visited: Number(data.visited),
          visitor: Number(data.visitor),
        };

        gameValidate(
          entry,
          () => {
            updateSoccerEntry({ id, entry }, sessionId).then(() => {
              setCurrentModal("close");

              if (myEntry) {
                const index = game.entries.map((e) => e.id).indexOf(user.id);
                game.entries[index] = { id: user.id, ...entry };
              } else {
                game.entries.push({ id: user.id, ...entry });
              }

              console.info(game.entries);

              updateGame(game);
            });
          },
          formRef
        );
      },
      { ignoreEmpty: false }
    );
  }

  function handleChange({ target }) {
    const max = target.value.length < 2 ? target.value.length : 2;
    target.value = ("0".repeat(max) + target.value).slice(max * -1);
  }

  return (
    <div className={styles.container}>
      <div>
        {currentModal === "close" && (
          <div className={styles.playBox}>
            <ModalCloseMessage
              className={styles.closeBox}
              title="Feito!"
              text="Seu palpite foi registrado com sucesso"
              cancel={() => {
                setCurrentModal("initial");
              }}
            />
          </div>
        )}

        {currentModal === "initial" && (
          <div className={styles.playBox}>
            {OnlyRegisteredUsers(
              () => {
                return (
                  <Form ref={formRef} onSubmit={handlePlaySubmit}>
                    <div>
                      <span>{slice(visitedName, { max: 12 })}</span>
                      <Input
                        name="visited"
                        placeholder="0"
                        defaultValue={myEntry?.visited ?? 0}
                        min={0}
                        autoComplete="off"
                        type="number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.button}>
                      <button>{myEntry ? "Alterar" : "Jogar"}</button>
                    </div>
                    <div>
                      <span>{slice(visitorName, { max: 12 })}</span>
                      <Input
                        name="visitor"
                        placeholder="0"
                        defaultValue={myEntry?.visitor ?? 0}
                        min={0}
                        autoComplete="off"
                        type="number"
                        onChange={handleChange}
                      />
                    </div>
                  </Form>
                );
              },
              () => (
                <HideContent vertical text="para fazer uma previsão" />
              )
            )}
          </div>
        )}

        <div className={styles.standBox}>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Banca</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{visitedName}</td>
                <td>{entries.visited}</td>
              </tr>
              <tr>
                <td>Empate</td>
                <td>{entries.draw}</td>
              </tr>
              <tr>
                <td>{visitorName}</td>
                <td>{entries.visitor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
