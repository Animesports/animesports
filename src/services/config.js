import { Fetch } from "../utils/Fetch";
import { DbConfig } from "../utils/Types";

export function updateProfileImage(image64, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/clients/profile`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: {
        image64,
      },
    }).then((result) => {
      if (result?.public_id) return resolve(result);
      reject();
    }, reject);
  });
}

export function updateUserConfig(config, { sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/clients`,
      {
        method: "PATCH",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
        body: convertToFetch(config),
      },
      { encrypt: true }
    ).then(({ acknowledged }) => {
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
