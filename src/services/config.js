import { Fetch } from "../utils/Fetch";
import { DbConfig } from "../utils/Types";

export function updateUserConfig(config, { sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/clients`, {
      method: "PATCH",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: convertToFetch(config),
    }).then(({ acknowledged }) => {
      if (!acknowledged) return reject();
      resolve();
    }, reject);
  });
}

function convertToFetch(config) {
  const rename = {};
  const dbNames = new DbConfig();
  for (const key in config) {
    rename[dbNames[key]] = config[key];
  }
  return rename;
}
