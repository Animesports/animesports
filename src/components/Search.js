import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/Search.module.css";

export function Search({ searchRef, onChange, parentNode }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  function updateQuery({ target }) {
    setQuery(target.value);
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
    console.info("search:", inputRef.current.placeholder);
  }

  function checkClicks({ target }) {
    if (!searchRef.current.contains(target)) {
      setQuery("");
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
