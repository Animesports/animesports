import { useRef } from "react";
import styles from "../styles/components/Advise.module.css";
export function Advise({ message }) {
  const ref = useRef(null);

  if (!message) return null;

  function close() {
    ref.current.classList.add(styles.remove);
    setTimeout(() => {
      ref.current.parentNode.removeChild(ref.current);
    }, 400);
  }

  return (
    <div ref={ref} className={styles.container}>
      <span>{message}</span>
      <img onClick={close} src="/icons/x.svg" alt="X" />
    </div>
  );
}
