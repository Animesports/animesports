import { Form } from "@unform/web";
import { useContext, useRef, useState } from "react";
import styles from "../styles/components/SoccerScheduler.module.css";
import { Input } from "../components/Input";
import { FetchSearcher } from "./FetchSearcher";
import { teamsSearchFilter } from "../utils/Soccer";
import { teamsSearcher } from "../services/soccer";
import { authContext } from "../contexts/AuthContext";
import { low } from "../utils/Global";
import { soccerSchedulerValidate } from "../utils/Yup";
import { scheduleSoccerGame } from "../services/admin";
import { ISOdateFormat, ISOtimeFormat, localDate } from "../utils/Date";
import { soccerContext } from "../contexts/SoccerContext";
import { convertGameFromFetch } from "../utils/Converter";
import { ModalCloseMessage } from "./ModalCloseMessage";
export function SoccerScheduler({
  initial,
  onSubmit,
  buttonText,
  close,
  message,
}) {
  const formRef = useRef(null);

  const { sessionId } = useContext(authContext);
  const { insertNewGame, updateGame } = useContext(soccerContext);

  const [currentModal, setCurrentModal] = useState("initial");

  const [team1, setTeam1] = useState(initial?.teams?.visited ?? {});
  const [team2, setTeam2] = useState(initial?.teams?.visitor ?? {});

  const [time, setTime] = useState(ISOtimeFormat(initial?.date) ?? "--:--");
  const [date, setDate] = useState(localDate(initial?.date) ?? "--/--/--");

  function handleFormChange() {
    const { date, time } = formRef.current.getData();

    if (date && date !== "") {
      setDate(localDate(date, { increase: 1 }));
    }

    if (time && time !== "") setTime(time);
  }

  function handleSubmit(values) {
    soccerSchedulerValidate(
      {
        visited: team1.name,
        visitor: team2.name,
        date: values.date,
        time: values.time,
      },
      () => {
        const func =
          typeof onSubmit === "function" ? onSubmit : scheduleSoccerGame;
        func(
          {
            visited: team1,
            visitor: team2,
            date: new Date(`${values.date}T${values.time}`),
            id: initial?.id ?? null,
          },
          sessionId
        ).then(
          (result) => {
            setCurrentModal("close");
            if (result.modified) {
              console.info(convertGameFromFetch(result.modified, initial));
              return updateGame(convertGameFromFetch(result.modified, initial));
            }

            insertNewGame(result.game);
          },
          (err) => {
            console.info("err", err);
          }
        );
      },
      formRef
    );
  }

  if (currentModal === "close") {
    return (
      <ModalCloseMessage
        title={message?.title}
        text={message?.text}
        close={close}
      />
    );
  }

  return (
    <div className={styles.container}>
      <Form
        onChange={handleFormChange}
        ref={formRef}
        className={styles.content}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputBox}>
          <div className={styles.dualInputBox}>
            <Input
              type="date"
              tag="Data"
              name="date"
              defaultValue={ISOdateFormat(initial?.date)}
              min={ISOdateFormat(new Date())}
              max="2022-05-27"
            />
            <Input
              tag="Hora"
              type="time"
              name="time"
              defaultValue={ISOtimeFormat(initial?.date)}
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
              defaultValue={team1.name}
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
              defaultValue={team2.name}
            />
          </FetchSearcher>
        </div>

        <div className={styles.previewBox}>
          <div className={styles.previewContent}>
            <div className={styles.title}>
              <span>
                Começa {time} • {date}
              </span>
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

            <button type="submit">{buttonText ?? "Agendar"}</button>
          </div>
        </div>
      </Form>
    </div>
  );
}
