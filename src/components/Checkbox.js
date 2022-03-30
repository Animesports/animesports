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
      <div>
        <label>
          <input
            onFocus={clearError}
            ref={InputRef}
            name={name}
            type="checkbox"
            defaultChecked={checked}
          />
          <span className={styles.checkmark}></span>
        </label>
        <span className={styles.label}>{label}</span>
      </div>

      {
        <span className={[globalStyles.error, styles.error].join(" ")}>
          {error && error}
        </span>
      }
      {
        // error && span  >> later
      }
      {children}
    </div>
  );
}
