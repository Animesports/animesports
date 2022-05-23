import { Fetch } from "../utils/Fetch";

export function getNotifications() {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/notifications`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
    }).then((data) => {
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function updateAsRead(notification, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/notifications/${notification.id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
      }
    ).then((data) => {
      if (data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}
