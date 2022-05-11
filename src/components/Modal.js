import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/components/Modal.module.css";

export function Modal({ openRef, children, customStyle, openOn, functions }) {
  const [visible, setVisible] = useState(false);
  const [modalRef, overlayRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    if (openRef && openRef.current) {
      openRef.current.addEventListener("click", () => {
        open();
      });
    }

    if (overlayRef.current && modalRef.current) {
      overlayRef.current.addEventListener("click", ({ target }) => {
        if (!modalRef.current.contains(target)) {
          close();
        }
      });
    }
  }, [modalRef, overlayRef, openRef?.current]);

  function close() {
    functions?.close?.() || setVisible(false);
  }

  function open() {
    functions?.open?.() || setVisible(true);
  }

  return (
    <>
      {(visible || openOn) && (
        <>
          <div
            className={!customStyle && styles.overlay}
            ref={overlayRef}
            onClick={close}
          />
          <div className={!customStyle && styles.container} ref={modalRef}>
            {React.cloneElement(children, { close, open })}
          </div>
        </>
      )}
    </>
  );
}
