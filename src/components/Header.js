import { useEffect, useState } from "react";
import styles from "../styles/components/Header.module.css";
import { Search } from "./Search";

export default function Header({ use }) {
  const [current, setCurrent] = useState(null);

  const items = [
    ["/leadboard", "LEADBOARD"],
    ["/soccer", "JOGOS"],
    ["/leagues", "LIGAS"],
    ["/rules", "REGRAS"],
    ["/account", "CONTA"],
  ];

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, []);

  const itemsList = items.map(([href, name], index) => {
    const imCurrent = current === href;
    if (use?.includes(href) || use === "all")
      return (
        <a
          key={name + index}
          className={(imCurrent && styles.current) || null}
          href={(!imCurrent && href) || null}
        >
          {name}
        </a>
      );
    return null;
  });

  return (
    <header className={styles.container}>
      <div className={styles.headerContent}>
        <div className={styles.userProfile}>
          <img src="/icons/user.svg" alt="user-profile" />
          <span>36 PONTOS</span>
        </div>
        <span className={styles.separator} />
        <div className={styles.itemsList}>{itemsList}</div>
      </div>

      <Search />
    </header>
  );
}
