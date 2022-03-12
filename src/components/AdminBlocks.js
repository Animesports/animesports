import styles from "../styles/components/AdminBlocks.module.css";
import Router from "next/router";

export function AdminBlocks() {
  const blocks = [
    ["Usuários", 39, "/icons/group.svg", "number", "/admin/users"],
    ["Montante", 74, "/icons/coins.svg", "cash", "/admin/payments"],
    ["Ingresso", 2, "/icons/money.svg", "cash", "/admin/payments"],
    ["Agendados", 12, "/icons/schedule.svg", "number", "/admin/calendar"],
  ];

  function navigateTo(url) {
    Router.push(url);
  }

  return (
    <div className={styles.container}>
      {blocks.map(([name, value, icon, type, redirect], index) => {
        return (
          <div
            onClick={() => navigateTo(redirect)}
            className={styles.block}
            key={type + index}
          >
            <div className={styles.icon}>
              <img src={icon} alt={type} />
            </div>

            <div className={styles.blockContent}>
              <div>
                {type === "number" && (
                  <span className={styles.value}>{value}</span>
                )}

                {type === "cash" && (
                  <>
                    <span className={styles.symbol}>R$</span>
                    <span className={styles.value}>{value}</span>
                    <span className={styles.cents}>,00</span>
                  </>
                )}
              </div>

              <span className={styles.name}>{name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
