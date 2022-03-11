import Router from "next/router";
import { useState } from "react";
import styles from "../styles/components/AdminSidebar.module.css";

export function AdminSidebar({ current }) {
  const [open, setOpen] = useState(true);

  const items = [
    ["/admin", "Painel", "/icons/dashboard.svg"],
    ["/admin/calendar", "Calendário", "/icons/calendar.svg"],
    ["/admin/users", "Usuários", "/icons/users.svg"],
    ["/admin/payments", "Pagamentos", "/icons/wallet.svg"],
  ];

  function openClose() {
    setOpen(!open);
  }

  return (
    <aside className={[styles.container, styles[open && "open"]].join(" ")}>
      <div className={styles.header}>
        <span>Dashboard</span>
        <img alt="<" src="/icons/swap.svg" onClick={openClose} />
      </div>

      {items.map(([target, display, image], index) => {
        const cStyle = target === current ? styles.current : null;
        return (
          <div
            onClick={() => {
              Router.push(target);
            }}
            key={target + index}
            className={[cStyle, styles.item].join(" ")}
          >
            <span>{display}</span>
            <img alt={display} src={image} />
          </div>
        );
      })}
    </aside>
  );
}
