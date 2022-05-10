import { Form } from "@unform/web";
import { useState, useRef } from "react";
import styles from "../styles/components/SoccerScheduler.module.css";
import { Input } from "../components/Input";

export function SoccerScheduler() {
  const formRef = useRef(null);

  const [timeOut, setOut] = useState(setTimeout(() => {}, 0));
  const [fetching, setFetching] = useState(false);

  const [search, setSearch] = useState([]);

  function onFormChange() {
    clearTimeout(timeOut);
    setOut(setTimeout(requestFetch, 1500));
  }

  function requestFetch() {
    setFetching(true);
    console.info(formRef.current);
  }

  function handleSubmit(values) {
    setState(values);
  }

  return (
    <div className={styles.container}>
      <Form
        ref={formRef}
        className={styles.content}
        onChange={onFormChange}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputBox}>
          <Input
            tag="Time visitado"
            list={["Flamengo", "Peru", "Vasco", "EUA", "Barcelona"]}
            name="visited"
            placeholder="Nome do visitado"
            autocomplete="off"
          />

          <Input
            tag="Time visitante"
            list={["Flamengo", "Peru", "Vasco", "EUA", "Barcelona"]}
            name="visitor"
            placeholder="Nome do visitante"
            autocomplete="off"
          />

          <div className={styles.dualInputBox}>
            <Input type="date" name="date" min="2022-05-06" max="2022-05-27" />
            <Input type="time" name="time" pattern="[0-9]{2}:[0-9]{2}" />
          </div>
        </div>

        <div className={styles.previewBox}>
          <div className={styles.previewContent}>
            <div className={styles.title}>
              <span>Começa 14:50 • 12/01/2022</span>
            </div>
            <div className={styles.teamsBox}>
              <div>
                <img src="/icons/soccer-shield.svg" alt="" />
                <strong>Time</strong>
              </div>
              <span className={styles.separator}>X</span>
              <div>
                <img src="/icons/soccer-shield.svg" alt="" />
                <strong>Time</strong>
              </div>
            </div>

            <button type="submit">Agendar</button>
          </div>
        </div>
      </Form>
    </div>
  );
}
