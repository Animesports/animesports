import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { updateUserConfig } from "../services/config";
import {
  convertConfigToUser,
  getConfigFromUser,
  updateObject,
} from "../utils/Global";
import { Config } from "../utils/Types";
import { authContext } from "./AuthContext";

export const configContext = createContext({
  config: Config,
  apply: Function,
  save: Function,
  saved: Boolean,
});

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(new Config());
  const [saved, setSaved] = useState(false);
  const { user, setUser } = useContext(authContext);

  function apply(data) {
    setConfig(data);
  }

  function save() {
    updateUserConfig(config, user).then(() => {
      setUser(updateObject(user, convertConfigToUser(config)));
    });
  }

  function checkIfSaved() {
    const userConfigs = getConfigFromUser(user);
    setSaved(
      Object.keys(userConfigs).filter((name) => {
        return userConfigs[name] !== config[name];
      }).length === 0
    );
  }

  useEffect(() => {
    if (!user.id) return;
    apply(getConfigFromUser(user));
  }, [user]);

  useEffect(checkIfSaved, [config, user]);

  return (
    <configContext.Provider
      value={{
        apply,
        save,
        config,
        saved,
      }}
    >
      {children}
    </configContext.Provider>
  );
}