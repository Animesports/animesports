import { Form } from "@unform/web";
import { useRef, useState } from "react";
import { OnlyRegisteredUsers } from "../services/auth";
import styles from "../styles/components/SoccerBlocks.module.css";
import { useNextOnEnter } from "../utils/Inputs";
import { Input } from "./Input";
import { HideContent } from "./HideContent";
import { gameValidate } from "../utils/Yup";
import { computeEntries, getEntWinner } from "../utils/Soccer";

export function SoccerScore({ ["game"]: { teams, score }, myEntrie }) {
  const myWinner = myEntrie && getEntWinner(myEntrie);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.standBox}>
          {OnlyRegisteredUsers(
            () => {
              return (
                <>
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
                          {["visited, visitor"].includes(myWinner) && (
                            <td>{teams[myWinner].name}</td>
                          )}
                        </tr>

                        <tr>
                          <td>Placar</td>
                          <td>
                            {score.visited} - {score.visitor}
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
                <td>Flamengo</td>
                <td>2</td>
              </tr>

              <tr>
                <td>São Paulo</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function SoccerPlay({ ["game"]: { teams, entries } }) {
  entries = computeEntries(entries);

  const formRef = useRef(null);
  const [visible, setVisible] = useState(true);

  if (!visible) return SoccerScore() ?? null;

  function handlePlaySubmit(data) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNextOnEnter(
      [
        formRef.current.getFieldRef("visited"),
        formRef.current.getFieldRef("visitor"),
      ],
      () => {
        const replaceNum = {
          visited: Number(data.visited),
          visitor: Number(data.visitor),
        };

        gameValidate(
          replaceNum,
          () => {
            console.info("game:", replaceNum);
            setVisible(false);
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
        <div className={styles.playBox}>
          {OnlyRegisteredUsers(
            () => {
              return (
                <Form ref={formRef} onSubmit={handlePlaySubmit}>
                  <div>
                    <span>{teams.visited.name}</span>
                    <Input
                      name="visited"
                      placeholder="0"
                      min={0}
                      autoComplete="off"
                      type="number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.button}>
                    <button>Jogar</button>
                  </div>
                  <div>
                    <span>{teams.visitor.name}</span>
                    <Input
                      name="visitor"
                      placeholder="0"
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
        <div className={styles.standBox}>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Banca</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{teams.visited.name}</td>
                <td>{entries.visited}</td>
              </tr>
              <tr>
                <td>Empate</td>
                <td>{entries.draw}</td>
              </tr>
              <tr>
                <td>{teams.visitor.name}</td>
                <td>{entries.visitor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
