import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/components/Modal.module.css";

export function Modal({ children, customStyle, state, onClose }) {
  const [visible, setVisible] = useState(state);
  const [modalRef, overlayRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      overlayRef.current.addEventListener("click", ({ target }) => {
        if (!modalRef.current.contains(target)) {
          close();
        }
      });
    }
  }, [modalRef, overlayRef]);

  function close() {
    setVisible(false);
    onClose?.();
  }

  if (visible) {
    return (
      <>
        <div
          className={!customStyle && styles.overlay}
          ref={overlayRef}
          onClick={close}
        />
        <div className={!customStyle && styles.container} ref={modalRef}>
          {React.cloneElement(children, { close })}
        </div>
      </>
    );
  }

  return null;
}
