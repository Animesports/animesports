import { OnlyAdminUsers } from "../../services/auth";
import { AdminSidebar } from "../../components/AdminSidebar";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";
import { Modal } from "../../components/Modal";
import { SoccerScheduler } from "../../components/SoccerScheduler";
import { useState } from "react";
import { SoccerEditor } from "../../components/SoccerEditor";

export default function Calendar() {
  const [openScheduler, setOpenScheduler] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <Structure contentClass={styles.container}>
      {OnlyAdminUsers(() => {
        return (
          <>
            <AdminSidebar current="/admin/calendar" />
            <div className={styles.content}>
              <div className={[styles.header, "opacity"].join(" ")}>
                <h1>Jogos Agendados</h1>
                <button onClick={() => setOpenScheduler(true)}>Novo</button>
              </div>
              <SoccerTable
                onSelect={setSelected}
                disable={["state"]}
                customClass={[styles.soccerTable, "opacity", "delay100"].join(
                  " "
                )}
                editable
              />
            </div>

            <Modal
              openOn={openScheduler}
              functions={{
                close: () => setOpenScheduler(false),
              }}
            >
              <SoccerScheduler
                message={{
                  title: "Agendado!",
                  text: "O jogo foi agendado com sucesso",
                  close: () => {
                    setOpenScheduler(false);
                  },
                }}
              />
            </Modal>

            <Modal
              openOn={selected}
              functions={{
                close: setSelected,
              }}
            >
              <SoccerEditor gameId={selected} />
            </Modal>
          </>
        );
      })}
    </Structure>
  );
}
