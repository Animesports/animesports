import { OnlyAdminUsers } from "../../services/auth";
import { History, PendingPayments } from "../../components/AdminPay";
import { AdminSidebar } from "../../components/AdminSidebar";
import { ExcelButton } from "../../components/ExcelButton";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";
import { useContext } from "react";
import { adminContext } from "../../contexts/AdminContext";
import { currency } from "../../utils/Global";

export default function Payments() {
  const { fetched, history, sendPay, receivePay, receiveSum, sendSum } =
    useContext(adminContext);

  return (
    <Structure contentClass={styles.container}>
      {OnlyAdminUsers(() => {
        return (
          <>
            <AdminSidebar current="/admin/payments" />
            <div className={styles.content}>
              <div className={styles.header}>
                <h2>Pagamentos Pendentes</h2>
                <h2>{currency().get(sendSum)}</h2>
              </div>

              <PendingPayments type="send" values={sendPay} ft={fetched} />

              <div className={styles.header}>
                <h2>Entrada de Pagamentos</h2>
                <h2>{currency().get(receiveSum)}</h2>
              </div>

              <PendingPayments
                type="receive"
                values={receivePay}
                ft={fetched}
              />

              <div className={styles.header}>
                <h2>Histórico de Transações</h2>
                <ExcelButton buttonText="Exportar" name="Histórico" />
              </div>

              <History values={history} ft={fetched} />
            </div>
          </>
        );
      })}
    </Structure>
  );
}
