import { AdminSidebar } from "../../components/AdminSidebar";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Calendar() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin/calendar" />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Jogos Agendados</h1>
          <button>Novo</button>
        </div>
        <SoccerTable
          disable={["state"]}
          customClass={styles.soccerTable}
          editable
        />
      </div>
    </Structure>
  );
}
