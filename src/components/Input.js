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
  readOnly,
  className,
  min,
  max,
  list,
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
    <div className={[styles.inputBox, styles.fixedTag].join(" ")}>
      <input
        id={name + "input"}
        list={list && name + "list"}
        onFocus={clearError}
        placeholder={placeholder ?? " "}
        ref={InputRef}
        name={name}
        type={type ?? "text"}
        autoComplete={autoComplete}
        readOnly={readOnly}
        className={className}
        min={min}
        max={max}
        {...rest}
      />

      {list && (
        <datalist id={name + "list"}>
          {list.map((v, ix) => (
            <option key={v + ix} value={v} />
          ))}
        </datalist>
      )}

      {tag && (
        <label htmlFor={name + "input"}>
          <div>{tag}</div>
        </label>
      )}
      {error && <span className={globalStyles.error}>{error}</span>}
      {children}
    </div>
  );
}
