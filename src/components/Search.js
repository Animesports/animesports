import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/Search.module.css";

export function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [ref, inputRef] = [useRef(null), useRef(null)];

  function updateQuery({ target }) {
    setQuery(target.value);
  }

  function changeState() {
    if (open) return handleSubmit();
    setOpen(!open);
  }

  function handleSubmit() {
    console.info("search:", inputRef.current.placeholder);
    setOpen(false);
  }

  useEffect(() => {
    document.addEventListener("click", ({ target }) => {
      if (!ref.current.contains(target)) {
        setQuery("");
        setOpen(false);
      }
    });

    inputRef.current.addEventListener("keydown", ({ keyCode }) => {
      keyCode === 13 && handleSubmit();
    });
  }, []);

  useEffect(() => {
    if (query.length === 0) setQuery("flamengo vasco sexta feira");
  }, [query]);

  return (
    <div
      ref={ref}
      className={`${styles.searchBox} ${(open && styles.opened) || null}`}
    >
      <img onClick={changeState} src="/icons/search.svg" alt="search" />
      <input onChange={updateQuery} ref={inputRef} placeholder={query} />
    </div>
  );
}
