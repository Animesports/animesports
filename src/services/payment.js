import { Fetch } from "../utils/Fetch";

export function getAllPayments({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/payments`,
      {
        method: "GET",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
      },
      { encrypt: true }
    ).then((data) => {
      if (data.statusCode) return reject(data);
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function createNewPayment({ sessionId, name }) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/payments`,
      {
        method: "POST",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
        body: {
          identifier: name && name.split(" ")[0].substring(0, 5).toLowerCase(),
        },
      },
      { encrypt: true }
    ).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.success) return resolve(data);
      reject(data);
    }, reject);
  });
}
