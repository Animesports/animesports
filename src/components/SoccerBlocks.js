import { Form } from "@unform/web";
import { useRef } from "react";
import { OnlyRegisteredUsers } from "../services/auth";
import styles from "../styles/components/SoccerBlocks.module.css";
import { useNextOnEnter } from "../utils/Inputs";
import { Input } from "./Input";
import { HideContent } from "./HideContent";

export function SoccerScore() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.standBox}>
          {OnlyRegisteredUsers(
            () => {
              return (
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2}>Meu Jogo</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Vitória</td>
                      <td>São Paulo</td>
                    </tr>

                    <tr>
                      <td>Placar</td>
                      <td>1 - 4</td>
                    </tr>
                  </tbody>
                </table>
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

export function SoccerPlay() {
  const formRef = useRef(null);

  function handlePlaySubmit(data, { reset }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNextOnEnter(
      [
        formRef.current.getFieldRef("visited"),
        formRef.current.getFieldRef("visitor"),
      ],
      () => {
        reset();
      }
    );
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
                    <span>Flamengo</span>
                    <Input
                      name="visited"
                      placeholder={0}
                      autoComplete="off"
                      type="number"
                    />
                  </div>
                  <div className={styles.button}>
                    <button>Jogar</button>
                  </div>
                  <div>
                    <span>São Paulo</span>
                    <Input
                      name="visitor"
                      placeholder={0}
                      autoComplete="off"
                      type="number"
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
                <td>Flamengo</td>
                <td>19</td>
              </tr>
              <tr>
                <td>Empate</td>
                <td>8</td>
              </tr>
              <tr>
                <td>São Paulo</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
