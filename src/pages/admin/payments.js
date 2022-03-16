import { History, PendingPayments } from "../../components/AdminPay";
import { AdminSidebar } from "../../components/AdminSidebar";
import { ExcelButton } from "../../components/ExcelButton";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Payments() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin/payments" />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Pagamentos Pendentes</h2>
          <h2>R$ 60,50</h2>
        </div>

        <PendingPayments type="send" />

        <div className={styles.header}>
          <h2>Entrada de Pagamentos</h2>
          <h2>R$ 26,00</h2>
        </div>

        <PendingPayments type="receive" />

        <div className={styles.header}>
          <h2>Histórico de Transações</h2>
          <ExcelButton buttonText="Exportar" name="Histórico" />
        </div>

        <History />
      </div>
    </Structure>
  );
}
