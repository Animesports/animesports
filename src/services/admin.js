import { Fetch } from "../utils/Fetch";

export function getAdminPayments({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/payments/all`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function getAllUsers({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/clients/all`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}
