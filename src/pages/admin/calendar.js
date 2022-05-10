import { OnlyAdminUsers } from "../../services/auth";
import { AdminSidebar } from "../../components/AdminSidebar";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";
import { Modal } from "../../components/Modal";
import { SoccerScheduler } from "../../components/SoccerScheduler";
import { useState } from "react";

export default function Calendar() {
  const [openScheduler, setOpenScheduler] = useState(false);

  return (
    <Structure contentClass={styles.container}>
      {OnlyAdminUsers(() => {
        return (
          <>
            <AdminSidebar current="/admin/calendar" />
            <div className={styles.content}>
              <div className={styles.header}>
                <h1>Jogos Agendados</h1>
                <button onClick={() => setOpenScheduler(true)}>Novo</button>
              </div>
              <SoccerTable
                disable={["state"]}
                customClass={styles.soccerTable}
                editable
              />
            </div>

            <Modal
              openOn={openScheduler}
              functions={{
                close: () => setOpenScheduler(false),
              }}
            >
              <SoccerScheduler />
            </Modal>
          </>
        );
      })}
    </Structure>
  );
}
