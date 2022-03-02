import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import globalStyles from "../styles/components/Forms.module.css";
import styles from "../styles/components/Checkbox.module.css";

export function Checkbox({ children, name, getRef, checked, label }) {
  const InputRef = useRef(null);
  if (getRef) getRef(InputRef);
  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: "checked",
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.inputBox}>
      <label className="container">
        {label}
        <input
          onFocus={clearError}
          ref={InputRef}
          name={name}
          checked={checked}
          type="checkbox"
        />
        <span className="checkmark"></span>
      </label>

      {<span className={globalStyles.error}>errorMessageHere {error}</span>}
      {
        // error && span  >> later
      }
      {children}
    </div>
  );
}
