import { Form } from "@unform/web";
import { useRef } from "react";
import styles from "../styles/components/SoccerBlocks.module.css";
import { useNextOnEnter } from "../utils/Inputs";
import { Input } from "./Input";

export function SoccerScore() {
  return <div className={styles.container}></div>;
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
        </div>

        <div className={styles.standBox}>
          <table>
            <tr>
              <th colSpan={2}>Banca</th>
            </tr>
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
          </table>
        </div>
      </div>
    </div>
  );
}
