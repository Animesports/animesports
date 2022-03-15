import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Payments() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin/payments" />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Pagamentos Pendentes</h2>
        </div>

        <div className={styles.header}>
          <h2>Entrada de Pagamentos</h2>
        </div>

        <div className={styles.header}>
          <h2>Histórico de Transações</h2>
          <button>Exportar</button>
        </div>
      </div>
    </Structure>
  );
}
