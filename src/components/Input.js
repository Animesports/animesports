import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import globalStyles from "../styles/components/Forms.module.css";
import styles from "../styles/components/Input.module.css";

export function Input({
  children,
  name,
  type,
  autoComplete,
  placeholder,
  tag,
  getRef,

  ...rest
}) {
  const InputRef = useRef(null);
  if (getRef) getRef(InputRef);
  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.inputBox}>
      <input
        onFocus={clearError}
        placeholder={placeholder ?? " "}
        {...rest}
        ref={InputRef}
        name={name}
        type={type ?? "text"}
        autoComplete={autoComplete}
      />

      {tag && (
        <label>
          <div>{tag}</div>
        </label>
      )}
      {error && <span className={globalStyles.error}>{error}</span>}
      {children}
    </div>
  );
}
