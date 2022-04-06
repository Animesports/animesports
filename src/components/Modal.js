import React, { useState, useRef, useEffect } from "react";

export function Modal({ openRef, children }) {
  const [visible, setVisible] = useState(false);
  const [modalRef, overlayRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    if (!openRef?.current) return;
    openRef.current.addEventListener("click", () => {
      open();
    });

    if (overlayRef.current && modalRef.current) {
      overlayRef.current.addEventListener("click", ({ target }) => {
        if (!modalRef.current.contains(target)) {
          close();
        }
      });
    }
  }, [modalRef, overlayRef, openRef]);

  function close() {
    setVisible(false);
  }

  function open() {
    setVisible(true);
  }

  return (
    <>
      {visible && (
        <>
          <div ref={overlayRef} />
          <div ref={modalRef}>
            {React.cloneElement(children, { close, open })}
          </div>
        </>
      )}
    </>
  );
}
