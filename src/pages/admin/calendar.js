import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Calendar() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin/calendar" />
      <div className={styles.content}>content here</div>
    </Structure>
  );
}
