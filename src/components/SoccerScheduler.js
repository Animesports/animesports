import { Form } from "@unform/web";
import { useRef, useState } from "react";
import styles from "../styles/components/SoccerScheduler.module.css";
import { Input } from "../components/Input";
import { FetchSearcher } from "./FetchSearcher";
import { teamsSearchFilter } from "../utils/Soccer";
import { teamsSearcher } from "../services/soccer";

import { low } from "../utils/Global";
import { soccerSchedulerValidate } from "../utils/Yup";

export function SoccerScheduler() {
  const formRef = useRef(null);

  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});

  function handleSubmit(values) {
    soccerSchedulerValidate(
      {
        visited: team1.name,
        visitor: team2.name,
        date: values.date,
        time: values.time,
      },
      () => {
        console.info({
          visited: team1,
          visitor: team2,
          date: new Date(`${values.date}T${values.time}`),
        });
      },
      formRef
    );
  }

  return (
    <div className={styles.container}>
      <Form ref={formRef} className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <div className={styles.dualInputBox}>
            <Input
              type="date"
              tag="Data"
              name="date"
              min="2022-05-06"
              max="2022-05-27"
            />
            <Input
              tag="Hora"
              type="time"
              name="time"
              pattern="[0-9]{2}:[0-9]{2}"
            />
          </div>

          <FetchSearcher
            searcher={teamsSearcher}
            filter={teamsSearchFilter}
            effect={(result) => {
              if (result.selected) setTeam1(result.selected);
            }}
          >
            <Input
              tag="Time visitado"
              name="visited"
              placeholder="Nome do visitado"
              autoComplete="off"
            />
          </FetchSearcher>

          <FetchSearcher
            searcher={teamsSearcher}
            filter={teamsSearchFilter}
            effect={(result) => {
              if (result.selected) setTeam2(result.selected);
            }}
          >
            <Input
              tag="Time visitante"
              name="visitor"
              placeholder="Nome do visitante"
              autoComplete="off"
            />
          </FetchSearcher>
        </div>

        <div className={styles.previewBox}>
          <div className={styles.previewContent}>
            <div className={styles.title}>
              <span>Começa 14:50 • 12/01/2022</span>
            </div>
            <div className={styles.teamsBox}>
              <div>
                <img
                  src={team1.logo ?? "/icons/soccer-shield.svg"}
                  alt={team1.id}
                />
                <strong>{low(team1.name) ?? "Time"}</strong>
              </div>

              <span className={styles.separator}>X</span>

              <div>
                <img
                  src={team2.logo ?? "/icons/soccer-shield.svg"}
                  alt={team2.id}
                />
                <strong>{low(team2.name) ?? "Time"}</strong>
              </div>
            </div>

            <button type="submit">Agendar</button>
          </div>
        </div>
      </Form>
    </div>
  );
}
