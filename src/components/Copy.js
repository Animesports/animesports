import copy from "copy-to-clipboard";
import { useState } from "react";
import styles from "../styles/components/Copy.module.css";

export function Copy({ children, value }) {
  const [copied, setCopied] = useState(false);

  function clipboard() {
    if (copied) return;

    setCopied(true);
    copy(value);

    setTimeout(() => {
      setCopied(false);
    }, 500);
  }

  return (
    <div
      className={[styles.container, styles[copied && "copied"]].join(" ")}
      onClick={clipboard}
    >
      {children}
    </div>
  );
}
