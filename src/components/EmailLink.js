import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

export function EmailLink({ to, name, children }) {
  const { user } = useContext(authContext);
  return (
    <a
      href={`mailto:${to}?subject=${
        user.data.name.split(" ")[0]
      }%2C%20do%20Animesports`}
    >
      {children}
    </a>
  );
}
