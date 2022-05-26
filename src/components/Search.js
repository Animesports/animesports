import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/Search.module.css";

export function Search({ searchRef, onChange, onSearch, parentNode, list }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const [timer, setTimer] = useState(null);

  list = Array.isArray(list) ? list : [];

  function updateQuery({ target }) {
    clearTimeout(timer);
    setQuery(target.value);
    setTimer(
      setTimeout(() => {
        const s = inputRef.current.placeholder.split(" ");

        onSearch &&
          onSearch(
            list.filter(
              (item) =>
                !s
                  .map((se) => item?.query?.indexOf?.(se.toLowerCase()) !== -1)
                  .includes(false)
            )
          );
      }, 1200)
    );
  }

  function openSearch() {
    if (open) return handleSubmit();
    inputRef.current.focus();
    setOpen(true);
    const loop = setInterval(onChange, 30);
    setTimeout(() => {
      clearInterval(loop);
    }, 200);
  }

  function closeSearch() {
    inputRef.current.blur();
    setOpen(false);
    const loop = setInterval(onChange, 30);
    setTimeout(() => {
      clearInterval(loop);
    }, 200);
  }

  function handleSubmit() {
    closeSearch();
    const s = inputRef.current.placeholder.split(" ");

    onSearch &&
      onSearch(
        list.filter(
          (item) =>
            !s.map((se) => item?.query?.indexOf?.(se) !== -1).includes(false)
        )
      );
  }

  function checkClicks({ target }) {
    if (!searchRef.current.contains(target)) {
      closeSearch();
    }
  }

  useEffect(() => {
    if (!parentNode.current) return;
    parentNode.current.addEventListener("click", checkClicks);

    inputRef.current.addEventListener("keydown", ({ keyCode }) => {
      keyCode === 13 && handleSubmit();
    });
  }, [parentNode]);

  useEffect(() => {
    if (query.length === 0) setQuery("flamengo vasco sexta feira");
  }, [query]);

  return (
    <div
      ref={searchRef}
      className={`${styles.searchBox} ${(open && styles.opened) || null}`}
    >
      <img onClick={openSearch} src="/icons/search.svg" alt="search" />
      <input onChange={updateQuery} ref={inputRef} placeholder={query} />
    </div>
  );
}
