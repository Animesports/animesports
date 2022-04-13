import { createContext, useState, useContext, useEffect } from "react";
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
  processing: Boolean,
});

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(new Config());
  const [saved, setSaved] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user, setUser, sessionId, signOut } = useContext(authContext);

  function apply(data) {
    setConfig(data);
  }

  async function save() {
    setProcessing(true);
    await updateUserConfig(config, { sessionId }).then(
      () => {
        setUser(updateObject(user, convertConfigToUser(config)));
      },
      () => {
        signOut({ reload: true });
      }
    );
    setProcessing(false);
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
        processing,
      }}
    >
      {children}
    </configContext.Provider>
  );
}
