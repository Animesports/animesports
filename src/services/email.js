import { Fetch } from "../utils/Fetch";

export function requestCodeConfirmation({ code }) {
  return new Promise(async (resolve, reject) => {
    if (!code) reject("missing-code");
    await Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/app/mailer/code/${code}`,
      {
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
        },
      }
    ).then(
      ({ success }) => {
        resolve(success);
      },
      () => {
        reject("fetch-error");
      }
    );
  });
}

export function requestTokenValidation({ email }) {
  return new Promise(async (resolve, reject) => {
    if (!email) reject("missing-email");
    await Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/mailer/token`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
      body: {
        email,
      },
    }).then(
      ({ success }) => {
        resolve(success);
      },
      () => {
        reject("fetch-error");
      }
    );
  });
}

export function requestCodeValidation({ email }) {
  return new Promise(async (resolve, reject) => {
    if (!email) reject("missing-email");
    await Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/mailer/code`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
      body: {
        email,
      },
    }).then(
      ({ success }) => {
        resolve(success);
      },
      () => {
        reject("fetch-error");
      }
    );
  });
}
