import styles from "../styles/components/Search.module.css";

export function Search() {
  return (
    <div className={styles.searchBox}>
      <img src="/icons/search.svg" alt="search" />
      <input type="text" placeholder="flamengo vasco sexta feira" />
    </div>
  );
}
