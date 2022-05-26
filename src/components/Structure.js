import Header from "./Header";
import soccerStyle from "../styles/pages/Soccer.module.css";
import { useRef } from "react";

export function Structure({
  customRef,
  children,
  headerUse,
  containerClass,
  contentClass,
  contentStyle,
  onSearch,
  searchList,
}) {
  const ref = useRef(null);

  return (
    <div
      ref={customRef ?? ref}
      className={[soccerStyle.container, "container-fwh", containerClass].join(
        " "
      )}
    >
      <Header
        use={headerUse ?? "all"}
        parentNode={customRef ?? ref}
        onSearch={onSearch}
        searchList={searchList}
      />
      <div
        style={contentStyle}
        className={[soccerStyle.content, contentClass].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
